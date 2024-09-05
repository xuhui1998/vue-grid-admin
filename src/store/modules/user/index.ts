import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';
import LoginDto from '@/dto/loginDto';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '',
    is_super: 0,
    name: '',
    role_id: '',
    role_name: '',
    role: '',
    avatar: '',
    auth_user_code: [],
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    /**
     * 获取用户信息
     */
    async info() {
      const { data } = await getUserInfo();
      this.setInfo(data);
      this.role = data.role_id;
    },

    // Login
    async login(loginForm: LoginDto) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
        return res;
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
