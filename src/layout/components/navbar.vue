<template>
  <div class="navbar">
    <ul class="right-side">
      <li>
        <a-tooltip content="主题配置">
          <div class="grid-btn">
            <IconSettings :size="18" />
          </div>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <div style="cursor: pointer" class="flex align-center grid-btn">
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
  import { computed } from 'vue';
  import { useUserStore } from '@/store';
  import useUser from '@/hooks/user';

  const userStore = useUserStore();
  const { logout } = useUser();
  const avatar = computed(() => {
    return userStore.avatar;
  });
  const userInfo = computed(() => {
    return {
      name: userStore.name,
    };
  });
  const handleLogout = () => {
    logout();
  };
</script>

<style scoped lang="less">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  .right-side {
    display: flex;
    height: 100%;
    align-items: center;
    padding-right: 20px;
    list-style: none;
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
