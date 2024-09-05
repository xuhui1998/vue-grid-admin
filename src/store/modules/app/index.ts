import { defineStore } from 'pinia';
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import defaultSettings from '@/config/settings.json';
import { getMenuList } from '@/api/user';
import { AppState } from './types';

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),
  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState) {
      return state.device;
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      // if (dark) {
      //   this.theme = 'dark';
      //   document.body.setAttribute('arco-theme', 'dark');
      // } else {
      //   this.theme = 'light';
      //   document.body.removeAttribute('arco-theme');
      // }
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
    collapseMenu() {
      this.menuCollapse = !this.menuCollapse;
    },
    setLayoutFullscreen() {
      this.layoutFullscreen = !this.layoutFullscreen;
    },
    processRoutes(routes: RouteRecordRaw[]) {
      return routes.map(route => {
        if (route.children) {
          route.children = this.processRoutes(route.children);
        }
        return route;
      });
    },
    async fetchServerMenuConfig() {
      try {
        const { data } = await getMenuList();
        this.serverMenu = this.processRoutes(data) as any[];
      } catch (error) {
        console.log(error);
      }
    },
    clearServerMenu() {
      this.serverMenu = [];
    },
  },
});

export default useAppStore;
