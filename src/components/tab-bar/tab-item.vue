<template>
  <a-dropdown
    trigger="contextMenu"
    :popup-max-height="false"
    @select="actionSelect"
  >
    <span
      :class="[
        'grid-tab-tag',
        'transition-all-300',
        `grid-tab-tag-${appStore.tabType}`,
        { 'link-activated': itemData.fullPath === $route.fullPath },
      ]"
      @click="goto(itemData)"
    >
      <span v-if="itemData.icon">
        <component
          :is="itemData.icon"
          v-if="getIconType(itemData.icon) === 'arco-icon'"
        ></component>
        <SvgIcon
          v-if="getIconType(itemData.icon) !== 'arco-icon'"
          :icon-class="itemData.icon"
        ></SvgIcon>
      </span>
      <span class="tag-link">
        {{ itemData.title }}
      </span>
      <span
        v-if="index > 0"
        class="grid-icon-close"
        @click.stop="tagClose(itemData, index)"
      >
        <icon-close :size="12" />
      </span>
    </span>
    <template #content>
      <a-doption
        class="separate-line"
        :disabled="disabledCurrent"
        :value="Eaction.current"
      >
        <icon-close />
        <span>关闭当前标签页</span>
      </a-doption>
      <a-doption :disabled="disabledLeft" :value="Eaction.left">
        <icon-to-left />
        <span>关闭左侧标签页</span>
      </a-doption>
      <a-doption
        class="separate-line"
        :disabled="disabledRight"
        :value="Eaction.right"
      >
        <icon-to-right />
        <span>关闭右侧标签页</span>
      </a-doption>
      <a-doption :value="Eaction.others">
        <icon-swap />
        <span>关闭其它标签页</span>
      </a-doption>
      <a-doption :value="Eaction.all">
        <icon-folder-delete />
        <span>关闭全部标签页</span>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { PropType, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useTabBarStore, useAppStore } from '@/store';
  import { getIconType } from '@/utils';
  import type { TagProps } from '@/store/modules/tab-bar/types';
  import { DEFAULT_ROUTE_NAME, REDIRECT_ROUTE_NAME } from '@/router/constants';

  // eslint-disable-next-line no-shadow
  enum Eaction {
    current = 'current',
    left = 'left',
    right = 'right',
    others = 'others',
    all = 'all',
  }

  const props = defineProps({
    itemData: {
      type: Object as PropType<TagProps>,
      default() {
        return [];
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  });

  const router = useRouter();
  const route = useRoute();
  const tabBarStore = useTabBarStore();
  const appStore = useAppStore();

  const goto = (tag: TagProps) => {
    router.push({ ...tag });
  };
  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });

  const disabledReload = computed(() => {
    return props.itemData.fullPath !== route.fullPath;
  });

  const disabledCurrent = computed(() => {
    return props.index === 0;
  });

  const disabledLeft = computed(() => {
    return [0, 1].includes(props.index);
  });

  const disabledRight = computed(() => {
    return props.index === tagList.value.length - 1;
  });

  const tagClose = (tag: TagProps, idx: number) => {
    tabBarStore.deleteTag(idx, tag);
    if (props.itemData.fullPath === route.fullPath) {
      const latest = tagList.value[idx - 1]; // 获取队列的前一个tab
      router.push({ name: latest.name });
    }
  };

  const findCurrentRouteIndex = () => {
    return tagList.value.findIndex((el) => el.fullPath === route.fullPath);
  };
  const actionSelect = async (value: any) => {
    const { itemData, index } = props;
    const copyTagList = [...tagList.value];
    if (value === Eaction.current) {
      tagClose(itemData, index);
    } else if (value === Eaction.left) {
      const currentRouteIdx = findCurrentRouteIndex();
      copyTagList.splice(1, props.index - 1);

      tabBarStore.freshTabList(copyTagList);
      if (currentRouteIdx < index) {
        router.push({ name: itemData.name });
      }
    } else if (value === Eaction.right) {
      const currentRouteIdx = findCurrentRouteIndex();
      copyTagList.splice(props.index + 1);

      tabBarStore.freshTabList(copyTagList);
      if (currentRouteIdx > index) {
        router.push({ name: itemData.name });
      }
    } else if (value === Eaction.others) {
      const filterList = tagList.value.filter((el, idx) => {
        return idx === 0 || idx === props.index;
      });
      tabBarStore.freshTabList(filterList);
      router.push({ name: itemData.name });
    } else {
      tabBarStore.resetTabList();
      router.push({ name: DEFAULT_ROUTE_NAME });
    }
  };
</script>

<style scoped lang="less">
  .grid-tab-tag {
    padding: 0px 12px;
    cursor: pointer;
    display: flex;
    gap: 5px;
    align-items: center;
    height: 28px;
    .tag-link {
      color: var(--color-text-2);
      text-decoration: none;
    }
    &:hover .grid-icon-close {
      padding: 3px;
      .arco-icon {
        width: 1em;
      }
    }
    .grid-icon-close {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      &:hover {
        background: #bfbfbf80;
      }
      .arco-icon {
        width: 0;
        transition: all 0.2s;
      }
    }
  }
  .grid-tab-tag-button {
    border-radius: 4px;
    &:hover {
      background: var(--grid-default-bg-color-7);
    }
  }
  .grid-tab-tag-button.link-activated {
    color: rgb(var(--link-6));
    background: var(--grid-tab-bg);
    &:hover {
      background: var(--grid-tab-bg);
    }
    .tag-link {
      color: rgb(var(--link-6));
    }
    .grid-icon-close:hover {
      background: #adc6ff80;
    }
  }

  .grid-tab-tag-card {
    border-radius: 2px;
    border: 1px solid var(--color-border-3);
    color: rgb(var(--link-6));
  }
  .grid-tab-tag-card.link-activated {
    border: 1px solid rgb(var(--arcoblue-6));
    .tag-link {
      color: rgb(var(--link-6));
    }
  }
  .grid-tab-tag-round {
    border-radius: 20px;
    &:hover {
      background: var(--grid-default-bg-color-7);
    }
  }
  .grid-tab-tag-round.link-activated {
    color: rgb(var(--link-6));
    background: var(--grid-tab-bg);
    &:hover {
      background: var(--grid-tab-bg);
    }
    .tag-link {
      color: rgb(var(--link-6));
    }
    .grid-icon-close:hover {
      background: #adc6ff80;
    }
  }
  .grid-tab-tag-chrome {
    position: relative;
    padding: 0px 18px;
    height: 32px;
    margin: 0 -8px 0 0;
    &:hover {
      background-color: #d9dde2;
      // border-radius: 4px;
      mask: url('@/assets/images/chrome-full.png');
      mask-size: 100% 100%;
    }
  }
  .grid-tab-tag-chrome.link-activated {
    mask: url('@/assets/images/chrome-full.png');
    mask-size: 100% 100%;
    background-color: #d7e3ff;
    z-index: 9;
    .tag-link {
      color: rgb(var(--link-6));
    }
  }

  :deep(.arco-dropdown-option-content) {
    span {
      margin-left: 10px;
    }
  }
  .separate-line {
    border-bottom: 1px solid var(--color-neutral-3);
  }
</style>
