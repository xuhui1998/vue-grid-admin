<template>
  <Container>
    <template #content>
      <Wrapper :content-style="{ padding: '20px' }">
        <div class="flex align-center">
          <a-color-picker v-model="colorValue" show-text />
          <a-button
            shape="circle"
            type="outline"
            size="small"
            class="ml-5"
            @click="getColor"
          >
            <SvgIcon icon-class="pipette" />
          </a-button>
        </div>
      </Wrapper>
    </template>
  </Container>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useEyeDropper } from '@vueuse/core';
  import { Message } from '@arco-design/web-vue';

  const colorValue = ref('#165DFF');

  // open打开颜色吸管, sRGBHex 实时颜色
  const { open, sRGBHex, isSupported } = useEyeDropper();
  const getColor = () => {
    if (!isSupported.value) {
      Message.warning('该浏览器暂不支持吸管功能!');
      return;
    }
    open();
  };

  watch(
    () => sRGBHex.value,
    (newValue) => {
      const copyText = `色值${newValue},已复制到粘贴板`;
      colorValue.value = newValue;
    },
    { deep: true }
  );
</script>

<script lang="ts">
  export default {
    name: 'ColorPicker',
  };
</script>

<style lang="less" scoped></style>
