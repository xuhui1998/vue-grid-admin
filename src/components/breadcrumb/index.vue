<template>
  <a-breadcrumb class="container-breadcrumb" :routes="breadcrumb">
    <!-- <a-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
      <MenuIcon :icon="item.icon" />
      {{ item.locale }}
    </a-breadcrumb-item> -->
    <template #item-render="{ route }">
      <a-dropdown trigger="click">
        <span
          :class="{ 'grid-btn': route.name !== appRoute.name }"
          @click="goTo(route)"
        >
          <MenuIcon :icon="route.icon" />
          {{ route.locale }}
        </span>
        <template v-if="route.name !== appRoute.name" #content>
          <a-doption
            v-for="item in dropdownArr"
            :key="item.name"
            @click="handleSetRoute(item)"
          >
            <template #icon>
              <MenuIcon :icon="item.meta.icon" />
            </template>
            {{ item.meta.locale }}
          </a-doption>
        </template>
      </a-dropdown>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { useRoute, useRouter, RouteRecordNormalized } from 'vue-router';
  import { useAppStore } from '@/store';
  import { toTreeArray } from 'xe-utils';
  import MenuIcon from '@/layout/components/menu-icon.vue';

  const appRoute = useRoute();
  const router = useRouter();
  const appStore = useAppStore();
  const routeArr = toTreeArray(appStore.serverMenu);
  const dropdownArr = ref<any[] | undefined>([]);

  const breadcrumb = computed(() => {
    return appRoute.matched.map((route: RouteRecordNormalized) => {
      const currentRoute = routeArr.find((item) => item.name === route.name);
      return {
        locale: currentRoute?.meta?.locale,
        icon: currentRoute?.meta?.icon,
        path: currentRoute?.path,
        name: currentRoute?.name,
      };
    });
  });

  const goTo = (route: RouteRecordNormalized) => {
    const clickRoute = routeArr.find((item) => item.name === route.name);
    dropdownArr.value = clickRoute?.children.filter(
      (item) => !item?.meta?.hideInMenu
    );
  };

  const handleSetRoute = (route: RouteRecordNormalized) => {
    router.push({ name: route.name });
  };
</script>

<style scoped lang="less">
  .container-breadcrumb {
    :deep(.arco-breadcrumb-item) {
      display: flex;
      align-items: center;
      gap: 6px;
      color: rgb(var(--gray-6));
      .grid-btn {
        padding: 4px 6px;
        display: flex;
        align-items: center;
        gap: 5px;
        &:hover {
          color: rgb(var(--primary-6));
        }
      }
      &:last-child {
        color: rgb(var(--gray-8));
        font-weight: bold;
      }
    }
  }
</style>
