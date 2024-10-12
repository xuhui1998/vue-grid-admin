<template>
  <div id="screen-container">
    <div class="header">
      <div small-bg class="header-horn">
        <dv-decoration8 />
      </div>
      <div demo-bg class="header-center">
        <div small-bg>
          <div class="screen-title">{{ title }}</div>
          <div small-bg class="screen-title-bottom">
            <dv-decoration5
              :dur="props.dur"
              style="width: 300px; height: 40px"
            />
          </div>
        </div>
      </div>
      <div small-bg class="header-horn">
        <dv-decoration8 :reverse="true" />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted } from 'vue';
  import { useFullscreen, useDark, useToggle } from '@vueuse/core';
  import { useRouter } from 'vue-router';

  const props = withDefaults(
    defineProps<{
      title?: string;
      dur?: number;
    }>(),
    {
      dur: 2,
    }
  );

  const {
    isFullscreen,
    toggle: toggleFullScreen,
    exit: exitFullScreen,
  } = useFullscreen();

  onMounted(() => {});
</script>

<script lang="ts">
  export default {
    name: 'FullScreen',
  };
</script>

<style lang="less" scoped>
  #screen-container {
    width: 100%;
    height: 100vh;
    background: #060914;
    background-size: 100% 100%;
    padding: 0 10px;
    .header {
      display: flex;
      margin-bottom: 40px;
      &-horn {
        width: 25%;
        height: 60px;
      }
      &-center {
        width: 50%;
      }
    }
    .screen-title {
      color: #fff;
      margin: 0 auto;
      width: 200px;
      height: 60px;
      line-height: 60px;
      font-size: 30px;
      font-weight: 700;
      text-align: center;
    }
    .screen-title-bottom {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
    }
    .setting {
      width: 32px;
      height: 150px;
      position: fixed;
      bottom: 10px;
      right: 10px;
      z-index: 999;
      :deep(.arco-space) {
        flex-direction: column;
        position: relative;
      }
      :deep(.arco-space-item) {
        color: var(--color-text-2);
        margin-right: 0 !important;
        cursor: pointer;
      }
      .arco-btn {
        background: var(--color-bg-5) !important;
        border: 1px solid var(--color-fill-3) !important;
        box-shadow: 0 2px 12px #0000001a;
      }
      .show-setting {
        position: absolute;
        bottom: 0;
        z-index: 99;
        transition: transform 0.5s;
      }
      .up {
        transform: rotate(0);
      }
      .down {
        transform: rotate(180deg);
      }
      .fade-enter-active {
        animation: move 0.5s linear;
      }
      .fade-leave-active {
        animation: move 0.5s reverse;
      }
      @keyframes move {
        from {
          transform: translateY(150px);
        }
        to {
          transform: translateY(0);
        }
      }
    }
  }
</style>
