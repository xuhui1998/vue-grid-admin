<template>
  <component
    :is="icon"
    v-if="icon && getIconType(icon) === 'arco-icon'"
    :size="18"
  ></component>
  <SvgIcon
    v-if="icon && getIconType(icon) !== 'arco-icon'"
    :icon-class="icon"
    :size="18"
  ></SvgIcon>
</template>

<script lang="ts" setup>
  import { getIconType } from '@/utils';

  interface Props {
    icon?: string;
  }

  defineProps<Props>();
</script>

<style lang="scss" scoped></style>
