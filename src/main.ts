/*
 * @Author: mizao 1253767373@qq.com
 * @Date: 2025-01-13 15:11:45
 * @LastEditors: mizao 1253767373@qq.com
 * @LastEditTime: 2025-03-26 13:58:22
 * @FilePath: /vue-grid-admin/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import DataVVue3 from '@kjgl77/datav-vue3';
import 'slider-verify-vue3/lib/style.css';
import SliderVerify from 'slider-verify-vue3';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';
// Styles are imported via arco-plugin. See config/plugin/arcoStyleImport.ts in the directory for details
// 样式通过 arco-plugin 插件导入。详见目录文件 config/plugin/arcoStyleImport.ts
// https://arco.design/docs/designlab/use-theme-package
import '@/assets/style/global.less';
import '@/assets/style/design.less';
import '@/assets/style/jv-light.less';
import '@/assets/style/grid-design.less';
import '@/assets/style/transition.less';
// import '@/assets/style/index.less';
import '@/api/interceptor';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

// 根据环境变量决定是否启用Mock
if (process.env.VUE_APP_API_MODE === 'mock') {
  import('./mock').then(module => {
    if (module && module.init) {
      module.init();
    }
  });
}

const app = createApp(App);

// app.use(vue3videoPlay);
app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(DataVVue3);
app.use(SliderVerify);

app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);

app.mount('#app');
