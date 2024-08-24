<template>
  <Container>
    <template #content>
      <iframe class="iframe" src="https://ptymt.cn/" frameborder="0"></iframe>
    </template>
  </Container>
</template>

<script lang="ts" setup>
  import { ref} from 'vue';
</script>

<script lang="ts">
  export default {
    name: 'VueDocument',
  };
</script>

<style lang="less" scoped>
  .iframe {
    width: 100%;
    height: 100%;
  }
</style>
