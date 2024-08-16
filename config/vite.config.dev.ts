import { mergeConfig } from 'vite';
import fs from 'fs';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      port: 8888,
      host: '0.0.0.0',
      open: true,
      fs: {
        strict: true,
      },
      hmr: false, // 热更新
      // https: true,
      // https: {
      //   key: fs.readFileSync('keys/agent2-key.pem'),
      //   cert: fs.readFileSync('keys/agent2-cert.pem'),
      // },
      // 为开发服务器配置自定义代理规则。
      proxy: {
        '/api': {
          // protocolRewrite: 'https',
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    // plugins: [
    //   eslint({
    //     cache: false,
    //     include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
    //     exclude: ['node_modules'],
    //   }),
    // ],
  },
  baseConfig
);
