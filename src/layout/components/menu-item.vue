<template>
  <template v-if="!item.meta?.hideInMenu">
    <a-menu-item v-if="isOneShowingChild
    && (!onlyOneChild?.children || onlyOneChild?.meta?.noShowingChildren)
    && !item?.meta?.alwaysShow
    " v-bind="attrs" :key="onlyOneChild?.name">
      <template #icon>
        <MenuIcon :icon="onlyOneChild?.meta?.icon || item?.meta?.icon"></MenuIcon>
      </template>
      <span>{{ onlyOneChild?.meta?.locale }}</span>
    </a-menu-item>

    <a-sub-menu v-else v-bind="attrs" :key="item.name" :title="item?.meta?.locale">
      <template #icon>
        <MenuIcon :icon="item?.meta?.icon"></MenuIcon>
      </template>
      <MenuItem v-for="child in item.children" :key="child.name" :item="child">
      </MenuItem>
    </a-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { useAttrs, ref } from 'vue';
import type { RouteRecordRaw } from 'vue-router'
import MenuIcon from './menu-icon.vue'

defineOptions({ name: 'MenuItem' })
const props = withDefaults(defineProps<Props>(), {})

const attrs = useAttrs()

interface Props {
  item: RouteRecordRaw
}

// 如果props.item的子项children只有一个hideInMenu: false的子元素, 那么onlyOneChild就表示这个子元素
const onlyOneChild = ref<RouteRecordRaw | null>(null)
const isOneShowingChild = ref(false)

const handleFunction = () => {
  const children = props.item?.children?.length ? props.item.children : []
  // 判断是否只有一个显示的子项
  const showingChildren = children.filter((i) => i.meta?.hideInMenu === false)
  if (showingChildren.length) {
    // 保存子项最后一个hideInMenu: false的元素
    onlyOneChild.value = showingChildren[showingChildren.length - 1]
  }

  // 当有三级菜单展示
  if (showingChildren.length > 0) {
    isOneShowingChild.value = false
  }

  // 如果没有要显示的子路由, 则显示父路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...props.item, meta: { ...props.item.meta, noShowingChildren: true } } as any
    isOneShowingChild.value = true
  }
}

handleFunction()
</script>
