import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
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
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.VITE_PORT),
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.VITE_PORT),
    },
  });
};
