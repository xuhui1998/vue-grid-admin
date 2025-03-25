/*
 * @Author: mizao 1253767373@qq.com
 * @Date: 2024-08-15 15:58:40
 * @LastEditors: mizao 1253767373@qq.com
 * @LastEditTime: 2025-03-25 15:38:42
 * @FilePath: /vue-grid-admin/src/store/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useBasicStore from './modules/basic';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { useAppStore, useUserStore, useTabBarStore, useBasicStore };
export default pinia;
