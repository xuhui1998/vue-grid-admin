<template>
  <div class="menu-demo">
    <a-menu mode="pop" :showCollapseButton="false" collapsed>
      <a-menu-item key="1">
        <template #icon><icon-apps></icon-apps></template>
        Navigation 1
      </a-menu-item>
      <a-sub-menu key="2">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>Navigation 2</template>
        <a-menu-item key="2_0">Beijing</a-menu-item>
        <a-menu-item key="2_1">Shanghai</a-menu-item>
        <a-menu-item key="2_2">Guangzhou</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="3">
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>Navigation 3</template>
        <a-menu-item key="3_0">Wuhan</a-menu-item>
        <a-menu-item key="3_1">Chengdu</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="4">
        <template #icon><icon-safe></icon-safe></template>
        Navigation 4
      </a-menu-item>
      <a-menu-item key="5">
        <template #icon><icon-fire></icon-fire></template>
        Navigation 5
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script lang='ts' setup>
</script>
<style lang='less' scoped>
  .menu-demo {
    box-sizing: border-box;
    border-right: 1px solid var(--color-border);
    background-color: var(--color-bg-1);
  }
</style>