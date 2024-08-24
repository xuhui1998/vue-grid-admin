<template>
  <Container>
    <template #content>
      <iframe
        class="iframe"
        src="https://arco.design/"
        frameborder="0"
      ></iframe>
    </template>
  </Container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
</script>

<script lang="ts">
  export default {
    name: 'ArcoDocument',
  };
</script>

<style lang="less" scoped>
  .iframe {
    width: 100%;
    height: 100%;
  }
</style>
