import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import prerender from '@prerenderer/rollup-plugin';
import { resolve } from 'path';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    resolve: {
      alias: [
        {
          find: '~/src',
          replacement: resolve(__dirname, 'src'),
        },
        {
          find: '~/components',
          replacement: resolve(__dirname, 'src/components'),
        },
        {
          find: '~/config',
          replacement: resolve(__dirname, 'src/config'),
        },
        {
          find: '~/context',
          replacement: resolve(__dirname, 'src/context'),
        },
        {
          find: '~/hooks',
          replacement: resolve(__dirname, 'src/hooks'),
        },
        {
          find: '~/images',
          replacement: resolve(__dirname, 'src/images'),
        },
        {
          find: '~/locales',
          replacement: resolve(__dirname, 'src/locales'),
        },
        {
          find: '~/pages',
          replacement: resolve(__dirname, 'src/pages'),
        },
        {
          find: '~/utils',
          replacement: resolve(__dirname, 'src/utils'),
        },
      ],
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
      prerender({
        routes: ['/', '/brawlian', '/brawler', '/events', '/maps', '/crew'],
        renderer: '@prerenderer/renderer-puppeteer',
        server: {
          host: 'localhost',
          listenHost: 'localhost',
        },
        rendererOptions: {
          maxConcurrentRoutes: 1,
          renderAfterTime: 500,
        },
        postProcess(renderedRoute) {
          renderedRoute.html = renderedRoute.html
            .replace(/http:/i, 'https:')
            .replace(
              /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
              'web3darchitrip.com',
            );
        },
      }),
    ],
    server: {
      proxy: {
        '/cdn': {
          target: 'https://cdn.brawltree.me',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/cdn/, ''),
        },
        '/api': {
          target: 'https://server.brawltree.me',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      host: '0.0.0.0',
      port: parseInt(process.env.VITE_PORT),
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.VITE_PORT),
    },
  });
};
