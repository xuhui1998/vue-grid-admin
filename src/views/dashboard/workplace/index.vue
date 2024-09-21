<template>
  <Container>
    <template #content>
      <Banner />
      <!-- <DataPanel /> -->
      <a-grid :cols="24" :col-gap="20" :row-gap="10">
        <a-grid-item :span="14">
          <ProjectPanel />
        </a-grid-item>
        <a-grid-item :span="10">
          <NimbleNav />
        </a-grid-item>
        <a-grid-item :span="14">
          <ProjectTrends />
        </a-grid-item>
      </a-grid>
    </template>
  </Container>
</template>

<script lang="ts" setup>
  import { ref, onMounted, defineAsyncComponent } from 'vue';

  const Banner = defineAsyncComponent(() => import('./components/banner.vue'));
  const DataPanel = defineAsyncComponent(() => import('./components/data-panel.vue'));
  const ProjectPanel = defineAsyncComponent(() => import('./components/project-panel.vue'));
  const NimbleNav = defineAsyncComponent(() => import('./components/nimble-nav.vue'));
  const ProjectTrends = defineAsyncComponent(() => import('./components/trends.vue'));

  onMounted(() => {});
</script>

<script lang="ts">
  export default {
    name: 'Dashboard',
  };
</script>

<style lang="less" scoped>
</style>
