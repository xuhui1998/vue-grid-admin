<template>
  <a-row :gutter="gutter">
    <a-form
      ref="tableForm"
      class="table-form"
      :model="formModel"
      auto-label-width
      :rules="rules"
      :layout="layout"
      :label-align="labelAlign"
    >
      <a-col
        v-for="field in visibleFields"
        :key="field.name"
        :span="field.span ? field.span : 22"
        :data-index="field.index"
      >
        <a-form-item
          v-if="field.name"
          :field="field.name"
          :label="field.label"
          :tooltip="field.tooltip"
          :label-col-flex="`${field.labelWidth}px`"
        >
          <component
            :is="field.type"
            v-model="formModel[field.name]"
            allow-search
            :allow-clear="field.allowClear === 'notAllow' ? false : true"
            :multiple="field.multiple"
            :style="field.style"
            :placeholder="field.placeholder"
            :options="field.options"
            :type="field.elType"
            :field-names="field.fieldNames"
            :disabled="field.disabled"
            :checked-value="field.checkedValue"
            :unchecked-value="field.uncheckedValue"
            :show-time="field.showTime"
            :allow-create="field.allowCreate"
            :min="field.min"
            :max="field.max"
            :step="field.step"
            :precision="field.precision"
            :mode="field.mode"
            :max-length="field.maxLength"
            :limit="field.limit"
            :check-strictly="field.checkStrictly"
            show-word-limit
            :show-text="field.showText"
            :disabled-alpha="field.disabledAlpha"
            :trigger-props="{ autoFitPopupMinWidth: true }"
            model-event="input"
            @change="change($event, field.name)"
          >
            <template v-if="field.appendText" #append>
              {{ field.appendText }}
            </template>
            <template v-if="field.checkedText" #checked>
              {{ field.checkedText }}
            </template>
            <template v-if="field.unCheckedText" #unchecked>
              {{ field.unCheckedText }}
            </template>
          </component>
        </a-form-item>
      </a-col>
      <slot name="custom"></slot>
    </a-form>
  </a-row>
</template>

<script lang="ts" setup>
  import { toRefs, ref, watch, computed, nextTick, defineModel } from 'vue';
  import { FormInstance, ResponsiveValue } from '@arco-design/web-vue';
  import type { FieldProps } from '@/types/global';

  const props = withDefaults(
    defineProps<{
      formJson: Array<any>;
      rules?: any;
      formState: FieldProps;
      layout?: 'horizontal' | 'vertical' | 'inline' | undefined;
      labelAlign?: 'left' | 'right' | undefined;
      gutter?:
        | number
        | ResponsiveValue
        | [number | ResponsiveValue, number | ResponsiveValue];
      display?: void | boolean;
    }>(),
    {
      layout: 'horizontal',
      formJson: () => [],
      display: false,
    }
  );
  const emit = defineEmits(['change']);

  // ref绑定组件
  const tableForm = ref<FormInstance>();
  const formModel = ref({} as any);
  // const formModel = defineModel();
  const { formJson, rules, formState, layout, labelAlign, gutter } =
    toRefs(props);

  defineExpose({
    formModel,
    tableForm,
  });

  /*
   * 表单过滤，特殊业务场景需要，没有则可以删除
   * 用于条件判断是否通过表单条件展示需要的内容
   * 待优化
   */
  const visibleFields = computed(() => {
    if (!props.display) {
      return formJson?.value === undefined ? false : formJson.value;
    }
    return props?.display();
  });

  nextTick(() => {
    const elements = document.querySelectorAll('.table-form .arco-col');
    const formBox = document.querySelector('.table-form');
    // 将 elements 转换为数组
    const elementsArray = Array.from(elements);
    // 按照 data-index 进行排序
    elementsArray.sort((a, b) => {
      const indexA = a.getAttribute('data-index');
      const indexB = b.getAttribute('data-index');
      return indexA - indexB;
    });
    elementsArray.forEach((element) => {
      // 如果没有data-index则不需要
      if (!element.getAttribute('data-index')) return;
      // 将元素插入到 DOM 中
      formBox?.appendChild(element);
    });
  });

  const change = (val: any, name: string) => {
    emit('change', val, name);
  };

  // 监听表单数据变化赋值
  watch(
    () => props.formState,
    (val) => {
      if (!val) return;
      formModel.value = val;
    },
    { deep: true, immediate: true }
  );
</script>

<script lang="ts">
  export default {
    name: 'TableForm',
  };
</script>

<style lang="less" scoped>
  // :deep(.arco-form) {
  //   align-items: center;
  // }
</style>
