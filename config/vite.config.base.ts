import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import { RollupOptions } from 'rollup';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import postcssPluginPx2rem from 'postcss-plugin-px2rem';
import configArcoStyleImportPlugin from './plugin/arcoStyleImport';

interface MyBuildOptions {
  outDir?: string;
  assetsDir?: string;
  chunkNames?: {
    [name: string]: string;
  };
  rollupOptions?: Omit<RollupOptions, 'output'> & {
    output?: RollupOptions['output'] | undefined;
  };
}

const px2remOptions = {
  rootValue: 192, // 换算基数， 默认100 ,也就是1440px ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多少px了
  unitPrecision: 5, // 允许REM单位增长到的十进制数字，其实就是精度控制
  propList: ['*'],
  selectorBlackList: ['.norem'],
  // propWhiteList: [], // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
  // propBlackList: [], // 黑名单
  // exclude:false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
  // selectorBlackList: [], //要忽略并保留为px的选择器
  // ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
  // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
  mediaQuery: false, // （布尔值）允许在媒体查询中转换px
  minPixelValue: 0, // 设置要替换的最小像素值(3px会被转rem)。 默认 0
};

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    configArcoStyleImportPlugin(),
    createSvgIconsPlugin({
      // 注册 SvgIconsPlugin 插件，并添加需要处理的 SVG 文件的路径
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: '[name]',
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.ts', '.js'],
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            'src/assets/style/breakpoint.less'
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
    // postcss: {
    //   plugins: [postcssPluginPx2rem(px2remOptions)],
    // },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    // 添加 svg-sprite-loader 所需的打包 chunk 名称
    chunkNames: {
      default: 'main',
      svg: 'icon-sprite',
    },
    rollupOptions: {
      // 指定需要手动打包的 chunks，这里包括了 svg 对应的 chunk
      manualChunks(id) {
        if (id.includes('/src/assets/icons/')) {
          return 'icon-sprite';
        }
        return undefined;
      },
    } as MyBuildOptions,
  },
  // 设置 svg-sprite-loader 配置项
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve(__dirname, 'src/icons'))
      .end();

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(resolve(__dirname, 'src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        extract: true,
        spriteFilename: 'static/icon-sprite.svg',
      })
      .end();
  },
});
