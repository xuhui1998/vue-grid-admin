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
        <Breadcrumb />
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
        <a-dropdown trigger="click">
          <div style="cursor: pointer">
            <a-avatar :size="32" :style="{ marginRight: '8px' }">
              <img v-if="avatar" alt="avatar" :src="avatar" />
              <IconUser v-else />
            </a-avatar>
            <span style="color: var(--color-text-2)">{{ userInfo.name }}</span>
          </div>
          <template #content>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  {{ $t('messageBox.logout') }}
                </span>
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
      padding: 0 10px;
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
</style>

<style lang="less">
  .message-popover {
    .arco-popover-content {
      margin-top: 0;
    }
  }
  .collapse {
    width: 20px;
    height: 20px;
  }
</style>
