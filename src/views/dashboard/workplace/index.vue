<template>
  <Container>
    <template #content>
      <Banner />
    </template>
  </Container>
</template>

<script lang="ts" setup>
  import { ref, onMounted, defineAsyncComponent } from 'vue';

  const Banner = defineAsyncComponent(() => import('./components/banner.vue'))

  onMounted(() => {})
</script>

<script lang="ts">
  export default {
    name: 'Dashboard',
  };
</script>

<style lang="less" scoped>
</style>
