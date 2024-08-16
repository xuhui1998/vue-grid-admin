<template>
  <component
    :is="icon"
    v-if="icon && icon.substring(0, 4).toLowerCase() === 'icon'"
    :size="18"
  ></component>
  <SvgIcon
    v-if="icon && icon.substring(0, 4).toLowerCase() !== 'icon'"
    :icon-class="icon"
    :size="18"
  ></SvgIcon>
</template>

<script lang="ts" setup>
  interface Props {
    icon?: string;
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped></style>
