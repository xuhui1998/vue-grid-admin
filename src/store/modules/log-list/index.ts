import { defineStore } from 'pinia';
import { LogListProps } from './types';

const useLogStore = defineStore({
  id: 'log-list',
  state: (): LogListProps => ({
    selectConfigList: {},
  }),
  // 配置数据持久化 pinia
  persist: {
    paths: [],
  },
  actions: {
  
  },
});

export default useLogStore;
