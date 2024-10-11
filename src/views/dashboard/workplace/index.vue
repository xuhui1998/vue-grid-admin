<template>
  <Container>
    <template #content>
      <Banner />
      <a-row :cols="24" :col-gap="20" :row-gap="10" :gutter="10">
        <a-col :span="16">
          <ProjectPanel />
          <ProjectTrends />
        </a-col>
        <a-col :span="8">
          <NimbleNav />
          <a-row :gutter="10">
            <a-col :span="12">
              <Document />
            </a-col>
            <a-col :span="12">
              <Carousel />
            </a-col>
          </a-row>
          <Record />
        </a-col>
      </a-row>
    </template>
  </Container>
</template>

<script lang="ts" setup>
  import { onMounted, defineAsyncComponent } from 'vue';

  const Banner = defineAsyncComponent(() => import('./components/banner.vue'));
  const ProjectPanel = defineAsyncComponent(
    () => import('./components/project-panel.vue')
  );
  const NimbleNav = defineAsyncComponent(
    () => import('./components/nimble-nav.vue')
  );
  const ProjectTrends = defineAsyncComponent(
    () => import('./components/trends.vue')
  );
  const Carousel = defineAsyncComponent(
    () => import('./components/carousel.vue')
  );
  const Document = defineAsyncComponent(
    () => import('./components/document.vue')
  );
  const Record = defineAsyncComponent(() => import('./components/record.vue'));

  onMounted(() => {});
</script>

<script lang="ts">
  export default {
    name: 'Dashboard',
  };
</script>

<style lang="less" scoped></style>
