<!-- modal统一封装避免生产环境@ok事件弹窗关闭问题 -->
<template>
  <a-modal
    v-model:visible="visible"
    :width="width"
    :mask-closable="maskClosable"
    :render-to-body="false"
    :body-class="bodyClass"
    :body-style="bodyStyle"
    :footer="!hideFooter"
    :hide-title="hideTitle"
    unmount-on-close
    draggable
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> {{ title }} </template>
    <slot name="content"></slot>
    <template #footer>
      <a-space v-if="!hideOk">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" :loading="confirmLoading" @click="handleOk">确定</a-button>
      </a-space>
      <a-button v-else type="primary" @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import { toRefs, type CSSProperties } from 'vue';

  const emit = defineEmits(['cancel', 'ok']);
  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title: string;
      width?: number;
      hideOk?: boolean;
      bodyClass?: string;
      bodyStyle?: CSSProperties;
      hideTitle?: boolean;
      hideFooter?: boolean;
      maskClosable?: boolean;
      confirmLoading?: boolean;
    }>(),
    {
      title: '',
      visible: false,
      width: 500,
      hideOk: false,
      maskClosable: false,
      confirmLoading: false
    }
  );
  const { visible } = toRefs(props);

  const handleCancel = () => {
    emit('cancel');
  };

  const handleOk = () => {
    emit('ok');
  };
</script>

<style lang="less" scoped></style>
