<template>
  <div class="flex" :style="flexStyle">
    <a-tooltip v-if="showTip" :content="content" mini popup-container=".container">
      <span class="omit">{{ content }}</span>
    </a-tooltip>
    <span v-else class="omit">{{ content }}</span>
    <a-link @click="myClipboard(content)"><IconCopy /></a-link>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { myClipboard } from '@/utils';

  const props = withDefaults(
    defineProps<{
    content: string;
    showTip?: boolean;
    align?: 'left' | 'center' | 'right';
  }>(),
    {
      showTip: true,
      align: 'center',
    }
  )

  const flexStyle = ref({
    display: 'flex',
    gap: '3px',
    alignItems: 'center',
    justifyContent: props.align,
  })
</script>
<script lang="ts">
  export default {
    name: 'TableOmitCell',
  };
</script>
<style lang="less" scoped></style>
