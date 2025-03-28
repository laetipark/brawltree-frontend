import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import prerender from '@prerenderer/rollup-plugin';
import { resolve } from 'path';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    define: {
      'process.env': process.env
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    },
    resolve: {
      alias: [
        {
          find: '~/src',
          replacement: resolve(__dirname, 'src')
        },
        {
          find: '~/assets',
          replacement: resolve(__dirname, 'src/assets')
        },
        {
          find: '~/components',
          replacement: resolve(__dirname, 'src/components')
        },
        {
          find: '~/config',
          replacement: resolve(__dirname, 'src/config')
        },
        {
          find: '~/context',
          replacement: resolve(__dirname, 'src/context')
        },
        {
          find: '~/hooks',
          replacement: resolve(__dirname, 'src/hooks')
        },
        {
          find: '~/images',
          replacement: resolve(__dirname, 'src/images')
        },
        {
          find: '~/locales',
          replacement: resolve(__dirname, 'src/locales')
        },
        {
          find: '~/pages',
          replacement: resolve(__dirname, 'src/pages')
        },
        {
          find: '~/utils',
          replacement: resolve(__dirname, 'src/utils')
        }
      ]
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
          listenHost: 'localhost'
        },
        rendererOptions: {
          maxConcurrentRoutes: 1,
          renderAfterTime: 500
        }
      })
    ],
    server: {
      allowedHosts: ['brawltree.me', 'www.brawltree.me'],
      host: '0.0.0.0',
      port: parseInt(process.env.VITE_PORT),
      proxy: {
        '/cdn': {
          target: 'https://cdn.brawltree.me',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/cdn/, '')
        },
        '/api': {
          target: 'https://server.brawltree.me',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/youtube': {
          target: 'https://www.googleapis.com/youtube/v3',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/youtube/, '')
        },
        '/inbox': {
          target: 'https://brawlstars.inbox.supercell.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/inbox/, '')
        }
      }
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.VITE_PORT)
    }
  });
};
