<template>
  <div class="navbar">
    <div
      v-if="appStore.layout !== 'mix'"
      class="left-side"
      :style="{ width: !menuCollapse ? `${appStore.menuWidth}px` : '48px' }"
    >
      <Logo />
    </div>
    <div v-if="appStore.layout !== 'mix'" class="center-side">
      <Menu v-if="topMenu" />
      <div v-else class="flex">
        <div class="collapse grid-btn ml-10 mr-10" @click="toggleDrawerMenu">
          <div :style="{ transform: menuCollapse ? 'rotate(180deg)' : '' }">
            <icon-menu-fold :size="18" />
          </div>
        </div>
        <Breadcrumb v-if="appStore.breadcrumb" />
      </div>
    </div>
    <ul class="right-side">
      <!-- <li>
        <a-tooltip
          :content="
            theme === 'light'
              ? $t('settings.navbar.theme.toDark')
              : $t('settings.navbar.theme.toLight')
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="handleToggleTheme"
          >
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li> -->
      <li>
        <a-tooltip content="主题配置">
          <div
            class="grid-btn"
            @click="appStore.updateSettings({ globalSettings: true })"
          >
            <IconSettings :size="18" />
          </div>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown
          trigger="click"
          position="br"
          popup-container="#app"
          class="nav-dropdown"
        >
          <div style="cursor: pointer" class="flex align-center grid-btn">
            <a-avatar :size="28">
              <img v-if="avatar" alt="avatar" :src="avatar" />
              <IconUser v-else />
            </a-avatar>
            <!-- <span style="color: var(--color-text-2)">{{ userInfo.name }}</span> -->
          </div>
          <template #content>
            <div class="user-info">
              <a-space>
                <a-avatar :size="36">
                  <img v-if="avatar" alt="avatar" :src="avatar" />
                  <IconUser v-else />
                </a-avatar>
                <span class="username">
                  {{ userInfo.name }}
                </span>
              </a-space>
            </div>
            <a-doption>
              <a-space>
                <icon-user />
                <span>个人中心</span>
              </a-space>
            </a-doption>
            <a-doption @click="toGitHub">
              <a-space>
                <icon-github />
                <span>GitHub</span>
              </a-space>
            </a-doption>
            <a-doption @click="handleLogout">
              <a-space>
                <icon-export />
                <span>退出登录</span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, inject } from 'vue';
  import { useDark, useToggle } from '@vueuse/core';
  import { useAppStore, useUserStore, useLogStore } from '@/store';
  import { openWindow } from '@/utils';
  import MyStorage from '@/utils/storage';
  import useUser from '@/hooks/user';
  import Menu from '@/components/menu/index.vue';
  import Breadcrumb from '@/components/breadcrumb/index.vue';
  import Logo from '@/layout/components/logo.vue';

  const appStore = useAppStore();
  const userStore = useUserStore();
  const logStore = useLogStore();
  const { logout } = useUser();
  const avatar = computed(() => {
    return userStore.avatar;
  });
  const storage = new MyStorage();
  const userInfo = computed(() => {
    return {
      name: userStore.name,
    };
  });
  const theme = computed(() => {
    return appStore?.theme;
  });
  const topMenu = computed(() => appStore.layout === 'top' && appStore.menu);
  const menuCollapse = computed(() => appStore.menuCollapse);
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      // overridden default behavior
      appStore.toggleTheme(dark);
    },
  });
  const toggleTheme = useToggle(isDark);
  const handleToggleTheme = () => {
    toggleTheme();
  };
  const handleLogout = () => {
    logout();
  };
  const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void;

  const toGitHub = () => {
    openWindow('https://github.com/xuhui1998/vue-grid-admin');
  };
</script>

<style scoped lang="less">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: transparent;
  }

  :deep(.arco-badge-text) {
    box-shadow: none;
  }

  .left-side {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }

  .center-side {
    flex: 1;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--color-border-2);
  }

  .right-side {
    display: flex;
    height: 100%;
    align-items: center;
    padding-right: 20px;
    list-style: none;
    border-bottom: 1px solid var(--color-border-2);
    margin: 0;
    :deep(.locale-select) {
      border-radius: 20px;
    }
    li {
      display: flex;
      align-items: center;
      padding: 0 6px;
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }
    .nav-btn {
      border-color: rgb(var(--gray-2));
      color: rgb(var(--gray-8));
      font-size: 16px;
    }
    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }
    .trigger-btn {
      margin-left: 14px;
    }
  }

  .nav-dropdown {
    width: 150px !important;
    .user-info {
      margin-bottom: 10px;
      padding: 6px;
      .username {
        font-weight: 600;
        color: var(--color-text-2);
      }
      &::after {
        content: '';
        position: absolute;
        top: 54px;
        left: 0;
        height: 1px;
        width: 100%;
        background-color: var(--color-border-2);
      }
    }
  }
</style>

<style>
  .nav-dropdown {
    width: 150px;
  }
</style>
