<template>
  <a-drawer
    :visible="visible"
    :width="width"
    unmount-on-close
    :mask-closable="maskClosable"
    :closable="false"
    :placement="placement"
    :hide-cancel="hideCancel"
    @cancel="handleCancel"
  >
    <template #title>
      <span>{{ title }}</span>
      <div
        v-if="visible"
        :class="['close', 'flex-center', 'transition-all-300', placementClass]"
        @click="handleCancel"
      >
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
          <a-button v-if="!hideCancel" @click="handleCancel">
            {{ cancelText }}
          </a-button>
          <a-button type="primary" :loading="okLoading" @click="handleOk">
            {{ okText }}
          </a-button>
        </a-space>
      </div>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { defineModel, computed, watch } from 'vue';

  type Placement = 'top' | 'right' | 'bottom' | 'left';
  interface Props {
    width?: number;
    visible: boolean;
    title: string;
    cancelText?: string;
    okText?: string;
    maskClosable?: boolean;
    placement?: Placement;
    hideCancel?: boolean;
    okLoading?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    width: 300,
    cancelText: '取消',
    okText: '确定',
    maskClosable: true,
    placement: 'right',
    hideCancel: false,
    okLoading: false,
  });
  const emit = defineEmits<{
    (e: 'onOk'): void;
    (e: 'onCancel'): void;
  }>();

  // const visible = defineModel({ type: Boolean, default: false });

  const placementClass = computed(() => {
    return `placement-close-${props.placement}`;
  });

  const handleOk = () => {
    emit('onOk');
  };

  const handleCancel = () => {
    emit('onCancel');
  };
</script>

<style lang="less" scoped>
  .close {
    width: 32px;
    height: 32px;
    position: absolute;
    cursor: pointer;
    background: var(--grid-primary-bg-color);
    &:hover .arco-icon {
      transform: rotate(90deg);
      transition: all 0.3s;
    }
    .arco-icon {
      color: var(--color-bg-1);
    }
  }
  .placement-close-right {
    left: -32px;
    top: 10px;
    border-radius: 4px 0 0 4px;
  }
  .placement-close-left {
    right: -32px;
    top: 10px;
    border-radius: 0 4px 4px 0;
  }
  .placement-close-top {
    right: 10px;
    bottom: -32px;
    border-radius: 0 0 4px 4px;
  }
  .placement-close-bottom {
    right: 10px;
    top: -32px;
    border-radius: 4px 4px 0 0;
  }
</style>
