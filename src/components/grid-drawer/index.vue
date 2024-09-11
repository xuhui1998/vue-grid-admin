<template>
  <a-drawer
    :width="width"
    unmount-on-close
    :mask-closable="maskClosable"
    :visible="visible"
    :closable="false"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>
      <span>{{ title }}</span>
      <div class="close flex-center" @click="handleCancel">
        <IconClose />
      </div>
    </template>
    <slot></slot>
    <template #footer>
      <div class="flex-row-between">
        <div>
          <slot name="footerLeft"></slot>
        </div>
        <a-space>
          <a-button @click="handleCancel">{{ cancelText }}</a-button>
          <a-button type="primary" @click="handleOk">{{ okText }}</a-button>
        </a-space>
      </div>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { defineModel } from 'vue';

  const visible = defineModel({ type: Boolean, default: false });

  interface Props {
    width?: number;
    title: string;
    cancelText?: string;
    okText?: string;
    maskClosable?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    width: 300,
    cancelText: '取消',
    okText: '确定',
    maskClosable: true,
  });
  const emit = defineEmits<{
    (e: 'onOk'): void;
    (e: 'onCancel'): void;
  }>();

  const handleOk = () => {
    emit('onOk');
  };

  const handleCancel = () => {
    emit('onCancel');
  };
</script>

<style lang="less" scoped>
  .close {
    width: 30px;
    height: 30px;
    position: absolute;
    left: -30px;
    top: 10px;
    cursor: pointer;
    border-radius: 4px 0 0 4px;
    background: var(--grid-primary-bg-color);
    &:hover .arco-icon {
      transform: rotate(90deg);
      transition: all 0.3s;
    }
    .arco-icon {
      color: var(--color-bg-1);
    }
  }
</style>
