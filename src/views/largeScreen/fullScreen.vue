<template>
  <div id="screen-container">
    <div class="header flex-row-between">
      <div class="header-left">当前时间: {{ createTime }}</div>
      <div class="header-center">
        <div class="screen-title">{{ title }}</div>
      </div>
      <div class="header-right"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted, onUnmounted } from 'vue';
  import { useFullscreen, useDark, useToggle } from '@vueuse/core';
  import { useRouter } from 'vue-router';
  import autofit from 'autofit.js';
  import dayjs from 'dayjs';

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

  const createTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  const timer = ref();

  onMounted(() => {
    autofit.init({
      dh: 1080,
      dw: 1920,
      el: '#screen-container',
      resize: true,
    });

    timer.value = setInterval(() => {
      createTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(timer.value);
  });
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
    padding: 0 10px;
    overflow: hidden;
    background-color: #060914;
    background-image: url('@/assets/images/bigScreen/header.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center -30px;
    .header {
      display: flex;
      margin-bottom: 50px;
      padding: 0 30px;
      &-left {
        color: #fff;
        font-size: 18px;
        height: 60px;
        line-height: 60px;
        width: 25%;
        font-family: YouSheBiaoTiHei;
      }
      &-center {
        .screen-title {
          color: #fff;
          margin: 0 auto;
          width: 100%;
          font-size: 32px;
          font-weight: 700;
          text-align: center;
          height: 80px;
          line-height: 80px;
          font-family: YouSheBiaoTiHei;
          color: #05e8fe;
        }
      }
      &-right {
        color: #fff;
        font-size: 28px;
        height: 60px;
        line-height: 60px;
        width: 25%;
      }
    }
  }
</style>
