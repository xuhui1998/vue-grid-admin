<template>
  <div
    ref="sliderContainer"
    :class="['slider-container', `slider-container-${size}`]"
    :style="{ width: sliderWidth }"
  >
    <div
      class="slider-fill"
      :style="{ width: sliderPosition + 'px', backgroundColor: fillColor }"
    ></div>
    <div :class="['slider-tips', { success: verifyPass }]">
      {{ verifyTips }}
    </div>
    <div
      class="slider-thumb"
      :style="{ left: `${sliderPosition}px`, ...sliderThumbStyle }"
      @mousedown="startDrag"
    >
      <IconCheck v-if="verifyPass" class="slider-icon" />
      <IconDoubleRight v-else class="slider-icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, defineModel, onMounted, onUnmounted } from 'vue';

  interface Props {
    size?: 'mini' | 'small' | 'medium' | 'large';
    sliderTip?: string;
    successTip?: string;
    fillColor?: string;
    width?: string | number;
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'medium',
    sliderTip: '请按住滑块拖动',
    successTip: '验证通过',
    fillColor: '#79ce8e',
  });
  const emit = defineEmits<{
    (e: 'onSuccess', status: boolean): void;
    (e: 'onFail', status: boolean): void;
  }>();

  const verifyPass = defineModel({ default: false, type: Boolean });
  const sliderContainer = ref();
  const sliderThumbStyle = ref({
    borderRadius: '4px 0 0 4px',
  });
  const verifyTips = ref(props.sliderTip);
  const sliderPosition = ref(0);
  const isDragging = ref(false);
  const startX = ref(0);
  const currentX = ref(0);

  const sliderWidth = computed(() => {
    if (props.width) {
      if (typeof props.width === 'number') {
        return `${props.width}px`;
      }
      return props.width;
    }
    return '100%';
  });

  const sizeMap = {
    mini: 24,
    small: 28,
    medium: 32,
    large: 36,
  };
  const fontsizeMap = {
    mini: 12,
    small: 13,
    medium: 14,
    large: 14,
  };
  const mini = `${sizeMap.mini}px`;
  const small = `${sizeMap.small}px`;
  const medium = `${sizeMap.medium}px`;
  const large = `${sizeMap.large}px`;

  const onDrag = (event) => {
    if (isDragging.value) {
      const x = event.clientX - startX.value;
      const newPosition = currentX.value + x;

      const containerRect = sliderContainer.value.getBoundingClientRect();
      // 滑块宽度
      const sliderWidth = sizeMap[props.size];
      const maxPosition = containerRect.width - sliderWidth;
      const minPosition = 0;

      if (newPosition >= sliderWidth) {
        sliderThumbStyle.value = { borderRadius: '4px' };
      } else {
        sliderThumbStyle.value = { borderRadius: '4px 0 0 4px' };
      }

      if (sliderPosition.value >= maxPosition) {
        sliderPosition.value = maxPosition;
        // 验证成功逻辑
        verifyPass.value = true;
        isDragging.value = false;
        verifyTips.value = props.successTip;
        // setTimeout(() => {
        //   console.log('验证成功', verifyPass.value);
        // });
        emit('onSuccess', true);
      } else {
        // 验证失败逻辑
        verifyPass.value = false;
        sliderPosition.value = 0;
        // console.log('验证失败', verifyPass.value);
        emit('onFail', false);
      }

      sliderPosition.value = Math.max(
        minPosition,
        Math.min(maxPosition, newPosition)
      );
    }
  };

  const endDrag = () => {
    isDragging.value = false;
    const containerRect = sliderContainer.value.getBoundingClientRect();
    const sliderWidth = sizeMap[props.size];
    if (sliderPosition.value < containerRect.width - sliderWidth) {
      sliderPosition.value = 0;
    }
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
  };

  const startDrag = (event) => {
    if (verifyPass.value) return;
    isDragging.value = true;
    startX.value = event.clientX;
    currentX.value = sliderPosition.value;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
  };

  onMounted(() => {
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
  });

  onUnmounted(() => {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
  });
</script>

<style lang="less" scoped>
  @keyframes shine {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  .slider-container-mini {
    width: 100px;
    height: v-bind(mini);
    .slider-thumb {
      width: v-bind(mini);
      height: v-bind(mini);
    }
  }

  .slider-container-small {
    width: 100px;
    height: v-bind(small);
    .slider-thumb {
      width: v-bind(small);
      height: v-bind(small);
    }
  }

  .slider-container-medium {
    width: 100px;
    height: v-bind(medium);
    .slider-thumb {
      width: v-bind(medium);
      height: v-bind(medium);
    }
  }

  .slider-container-large {
    width: 100px;
    height: v-bind(large);
    .slider-thumb {
      width: v-bind(large);
      height: v-bind(large);
    }
  }

  .slider-container {
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #e5e6eb;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    background-color: #f2f2f2;
    .slider-fill {
      border-radius: 4px 0 0 4px;
      position: absolute;
      left: 0;
      height: 100%;
      z-index: 2;
    }
    .success {
      -webkit-text-fill-color: #fff;
      -webkit-font-smoothing: auto;
    }
    .slider-tips {
      font-size: 12px;
      position: absolute;
      display: flex;
      justify-content: center;
      z-index: 3;
      user-select: none;
      color: transparent;
      background: radial-gradient(circle at center, #fffc, #f000) -200% 50% / 200%
          100% no-repeat,
        #000;
      animation: 2s linear 0s infinite normal none running shine;
      background-clip: text;
    }
    .slider-thumb {
      text-align: center;
      background-color: #fff;
      position: absolute;
      cursor: move;
      z-index: 9;
      box-shadow: 0 0 transparent, 0 0 transparent, 0 4px 6px -1px #0000001a,
        0 2px 4px -2px #0000001a;
      .slider-icon {
        height: 100%;
        color: #666;
      }
    }
  }
</style>
