<template>
  <LayoutMix v-if="appStore.layout === 'mix'"></LayoutMix>
  <LayoutDefault v-else></LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from './default-layout.vue'
import LayoutMix from './layout-mix.vue'
import { useAppStore } from '@/store'

defineOptions({ name: 'Layout' })
const appStore = useAppStore()
</script>

<style lang="less" scoped></style>
