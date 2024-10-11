<template>
  <Wrapper>
    <a-carousel
      :style="{
        height: '160px',
      }"
      :auto-play="true"
      indicator-type="slider"
      animation-name="card"
      show-arrow="hover"
    >
      <a-carousel-item v-for="(image, index) in images" :key="index">
        <img
          :src="image"
          :style="{
            width: '100%',
            height: '100%',
            borderRadius: '4px',
          }"
        />
      </a-carousel-item>
    </a-carousel>
  </Wrapper>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';

  const images = reactive([
    'https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/5cc3cd1d994b7ef9db6a1f619a22addd.jpg~tplv-49unhts6dw-image.image',
    'https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/f256cbcc287139e191fecea9d255a1f0.jpg~tplv-49unhts6dw-image.image',
    'https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/b557ff0cd44146a2e471b477af2f30d0.jpg~tplv-49unhts6dw-image.image',
    'https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/665106f4bbd2a2df96eaf7aec52f7bc3.jpg~tplv-49unhts6dw-image.image',
    'https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea095a2c9c72b5d8f2f2818040db736d.jpg~tplv-49unhts6dw-image.image',
  ]);
</script>

<script lang="ts">
  export default {
    name: 'Carousel',
  };
</script>

<style lang="less" scoped></style>
