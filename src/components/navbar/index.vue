<template>
  <div class="navbar">
    <div
      class="left-side"
      :style="{ paddingLeft: (menuCollapse ? 12 : 20) + 'px' }"
    >
      <a-space
        :style="{
          width: (menuCollapse ? 48 : appStore.menuWidth - 8) - 20 + 'px',
        }"
      >
        <img
          alt="logo"
          src="../../assets/images/logo.png"
          :width="menuCollapse ? 24 : 35"
        />
        <a-typography-title
          :style="{ margin: 0, fontSize: '18px', fontFamily: 'syht Regular' }"
          :heading="5"
          style="white-space: nowrap"
        >
          <a-badge
            text="beta"
            :offset="[20, -4]"
            :dot-style="{ fontSize: '10px', borderBottomLeftRadius: 0 }"
          >
            {{ appStore.projectName }}
          </a-badge>
        </a-typography-title>
        <icon-menu-fold
          v-if="!topMenu && appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
      <div class="collapsez">
        <div
          @click="toggleDrawerMenu"
          :style="{ transform: menuCollapse ? 'rotate(180deg)' : '' }"
        >
          <icon-menu-fold />
        </div>
      </div>
    </div>
    <div class="center-side">
      <Menu v-if="topMenu" />
    </div>
    <ul class="right-side">
      <li>
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
      </li>
      <li>
        <a-dropdown trigger="click">
          <div style="cursor: pointer">
            <a-avatar
              :size="32"
              :style="{ marginRight: '8px' }"
            >
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
  const topMenu = computed(() => appStore.topMenu && appStore.menu);
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
    background-color: var(--color-bg-2);
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
    transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    img,
    :deep(.arco-space.arco-space-horizontal.arco-space-align-center) {
      transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
      overflow-x: hidden;
      height: 100%;
    }
  }

  .center-side {
    flex: 1;
    margin-left: -40px;
    border-bottom: 1px solid var(--color-border);
  }

  .right-side {
    display: flex;
    height: 100%;
    align-items: center;
    padding-right: 20px;
    list-style: none;
    border-bottom: 1px solid var(--color-border);
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
  .collapsez {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    > div {
      margin-left: 18px;
      color: var(--color-text-3);
      background-color: var(--color-fill-1);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: var(--border-radius-small);
      cursor: pointer;
      svg {
        width: 1.2em;
        height: 1.2em;
      }
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 8px;
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--color-border);
    }
  }
</style>
