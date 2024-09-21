<template>
  <div class="container">
    <slot name="back">
      <div class="back"></div>
    </slot>
    <div class="header">
      <slot name="header"></slot>
    </div>
    <slot name="form"></slot>
    <slot name="buttons"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  .container {
    padding: 8px;
    position: relative;
    height: 100%;
    overflow: auto;
  }
  .arco-space {
    margin-bottom: 10px;
  }
  .arco-card {
    border: none;
    :deep(.arco-card-header) {
      border: none;
    }
  }
</style>
