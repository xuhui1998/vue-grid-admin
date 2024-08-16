<template>
  <a-row
    :gutter="20"
    :class="['search-form-box', conditionFold ? 'expand' : 'collapse']"
    :style="{ height: conditionFold ? expandHeight : `${searchItemHeight}px` }"
    style="overflow-y: hidden"
  >
    <a-col :flex="1" style="overflow: hidden">
      <a-form
        ref="searchForm"
        :model="formModel"
        auto-label-width
        :size="size"
        :layout="layout"
      >
        <template v-if="customWidth">
          <a-form-item
            v-for="field in (formJson as any)"
            :key="field.name"
            :field="field.name"
            :label="field.label"
            :hide-label="field.hideLabel"
            :style="{
              width: field.width + 'px',
            }"
            :label-col-flex="`${field.labelWidth}px`"
            :data-index="field.index"
            :tooltip="field.tooltip"
          >
            <component
              :is="field.type"
              v-model="formModel[field.name]"
              :allow-clear="field.allowClear === 'notAllow' ? false : true"
              allow-search
              :trigger-props="{ autoFitPopupMinWidth: true }"
              :placeholder="field.placeholder"
              :multiple="field.multiple"
              :max-tag-count="field.maxTagCount"
              :options="field.options"
              :type="field.elType"
              :field-names="field.fieldNames"
              :format="field.format"
              :shortcuts="field.shortcuts"
              :shortcuts-position="field.position"
              popup-container=".container"
              @change="(val) => handleChange(val, field.name)"
              @input="(val) => handleInput(val, field.name)"
              @clear="(val) => handleClear(val, field.name)"
            >
            </component>
          </a-form-item>
          <slot name="custom"></slot>
        </template>
        <a-row
          v-else
          :gutter="{ md: 6, lg: 18, xl: 24 }"
          :class="className"
          style="overflow: hidden"
          :justify="justify"
        >
          <a-col
            v-for="field in (formJson as any)"
            :class="`${className}-item`"
            :key="field.name"
            :span="24 / columns"
            :style="{
              flex: `0 0 ${100 / columnLength}%`,
              width: `${100 / columnLength}%`,
            }"
          >
            <a-form-item
              :field="field.name"
              :label="field.label"
              :style="{
                width: field.width + 'px',
              }"
              :label-col-flex="`${field.labelWidth}px`"
              :tooltip="field.tooltip"
              :hide-label="field.hideLabel"
              :data-index="field.index"
            >
            
              <component
                :is="field.type"
                v-model="formModel[field.name]"
                :allow-clear="field.allowClear === 'notAllow' ? false : true"
                allow-search
                :trigger-props="{ autoFitPopupMinWidth: true }"
                :placeholder="field.placeholder"
                :multiple="field.multiple"
                :max-tag-count="field.maxTagCount"
                :options="field.options"
                :type="field.elType"
                :field-names="field.fieldNames"
                :format="field.format"
                :shortcuts="field.shortcuts"
                :shortcuts-position="field.position"
                popup-container=".container"
                @change="(val) => handleChange(val, field.name)"
                @input="(val) => handleInput(val, field.name)"
                @clear="(val) => handleClear(val, field.name)"
              >
              </component> </a-form-item
          ></a-col>
          <a-col
            v-if="slotLength"
            :span="24 / columns"
            :class="`${className}-item`"
            :style="{
              flex: `0 0 ${100 / columnLength}%`,
              width: `${100 / columnLength}%`,
            }"
          >
            <slot name="custom"></slot>
          </a-col>
          <slot name="extra"></slot>
        </a-row> </a-form
    ></a-col>
    <a-col v-if="!hideSearch" flex="86px">
      <a-space :direction="(direction as DirectionType)">
        <a-button
          :class="{ 'btn-icon': searchIcon }"
          type="primary"
          @click="search"
        >
          <template #icon>
            <icon-search />
          </template>
          <template v-if="!searchIcon" #default>{{
            $t('form.search')
          }}</template>
        </a-button>
        <a-button :class="{ 'btn-icon': searchIcon }" @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          <template v-if="!searchIcon" #default>{{
            $t('form.reset')
          }}</template>
        </a-button>
        <a-button v-if="newTab" :class="{ 'btn-icon': searchIcon }" @click="openNewTab">
          <template #icon>
            <SvgIcon icon-class="new-tab" color="var(--color-text-2)" />
          </template>
        </a-button>
        <a-button
          v-if="showToggleBtn"
          type="text"
          size="small"
          @click="toggleShowCondition"
        >
          <template v-if="!searchIcon" #default>{{
            conditionFold ? '收起' : '展开'
          }}</template>
          <template #icon>
            <icon-double-up v-if="conditionFold" />
            <icon-double-down v-if="!conditionFold" />
          </template>
        </a-button>
        <a-popconfirm
          v-if="isExport"
          content="确认导出数据？"
          ok-text="确认"
          cancel-text="取消"
          position="left"
          @ok="exportToExcel"
        >
          <a-button
            :class="{ 'btn-icon': searchIcon }"
            type="primary"
          >
            <template #icon>
              <icon-import />
            </template>
            <template v-if="!searchIcon" #default>导出</template>
          </a-button>
        </a-popconfirm>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { toRefs, ref, nextTick, computed, defineModel, onMounted } from 'vue';
  import { FormInstance } from '@arco-design/web-vue';

  type LayoutTypes = 'inline' | 'horizontal' | 'vertical' | undefined;
  type DirectionType = 'horizontal' | 'vertical' | undefined;

  const props = withDefaults(
    defineProps<{
      layout?: LayoutTypes;
      formJson?: Array<any[]>;
      direction?: string;
      columns?: number;
      customWidth?: boolean;
      isExport?: boolean;
      slotLength?: number;
      className?: string;
      hideSearch?: boolean;
      searchIcon?: boolean;
      autoColumnWidth?: boolean;
      newTab?: boolean;
      size?: 'small' | 'mini' | 'medium' | 'large' | undefined;
      justify?: 'start' | 'center' | 'end' | 'space-around' | 'space-between';
    }>(),
    {
      layout: 'horizontal',
      formJson: () => [],
      customWidth: false,
      columns: 4,
      direction: 'horizontal',
      isExport: false,
      slotLength: 0,
      className: 'search-box',
      hideSearch: false,
      searchIcon: false,
      newTab: false,
      autoColumnWidth: true,
    }
  );
  const { formJson, direction, customWidth, layout } = toRefs(props);

  const emit = defineEmits<{
    (e: 'onSearch', val: any): void;
    (e: 'onReset'): void;
    (e: 'exportToExcel'): void;
    (e: 'openNewTab'): void;
    (e: 'change', val: any, name: string): void;
    (e: 'input', val: any, name: string): void;
    (e: 'clear', val: any, name: string): void;
  }>();
  const slots = defineSlots();

  const columnLength = computed(() => {
    if (!props.autoColumnWidth) {
      return props.columns;
    }
    if (screenWidth.value >= 1500) {
      return props.columns;
    }
    if (screenWidth.value >= 1300 && screenWidth.value < 1500) {
      return 4;
    }
    if (screenWidth.value >= 800 && screenWidth.value < 1300) {
      return 3;
    }
    if (screenWidth.value < 800) {
      return 2;
    }
    return props.columns;
  });

  const searchForm = ref<FormInstance>();
  const conditionFold = ref<boolean>(false);
  const formModel: any = defineModel();
  const screenWidth = ref(window.innerWidth);
  const searchItemHeight = ref(0)
  const expandHeight = computed<string>(() => {
    return `${
      searchItemHeight.value *
      Math.ceil((formJson.value.length + props.slotLength) / columnLength.value)
    }px`;
  });

  const showToggleBtn = computed(() => {
    return (formJson.value.length + props.slotLength) / columnLength.value > 1;
  });

  nextTick(() => {
    const elements =
      layout.value === 'inline'
        ? document.querySelectorAll('.arco-form-item')
        : document.querySelectorAll(`.${props.className}-item`);
    const formBox =
      layout.value === 'inline'
        ? document.querySelector('.arco-form')
        : document.querySelector(`.${props.className}`);
    // 将 elements 转换为数组
    // console.log(elements, formBox);
    const elementsArray = Array.from(elements);
    // console.log(elementsArray);
    // 当不是自定义宽度时遍历方式
    if (layout.value === 'horizontal') {
      elementsArray.sort((a, b) => {
        if (
          a.querySelector('.arco-form-item')?.hasAttribute('data-index') ||
          b.querySelector('.arco-form-item')?.hasAttribute('data-index')
        ) {
          const indexA = a
            .querySelector('.arco-form-item')
            ?.getAttribute('data-index');
          const indexB = b
            .querySelector('.arco-form-item')
            ?.getAttribute('data-index');
          return indexA - indexB;
        }
      });
      elementsArray.forEach((element) => {
        // 如果没有data-index则不需要
        if (
          !element.querySelector('.arco-form-item')?.getAttribute('data-index')
        )
          return;
        // 将元素插入到 DOM 中
        formBox?.appendChild(element);
      });
      return;
    }
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

  const toggleShowCondition = () => {
    conditionFold.value = !conditionFold.value;
  };

  const resizeHandler = () => {
    screenWidth.value = window.innerWidth;
  };

  const search = () => {
    emit('onSearch', formModel.value);
  };

  const reset = () => {
    searchForm.value?.resetFields();
    Object.keys(formModel.value).forEach((key) => {
      if (formModel.value[key] === undefined) {
        delete formModel.value[key];
      }
    });
    emit('onReset');
  };

  const openNewTab = () => {
    emit('openNewTab');
  };

  const exportToExcel = () => {
    emit('exportToExcel');
  };

  const handleChange = (val: any, name: string) => {
    emit('change', val, name);
  };
  const handleInput = (val: any, name: string) => {
    emit('input', val, name);
  };
  const handleClear = (val: any, name: string) => {
    emit('clear', val, name);
  };

  defineExpose({
    formModel: formModel.value,
  });

  onMounted(() => {
    window.addEventListener('resize', resizeHandler);
    nextTick(() => {
      searchItemHeight.value = document
        .querySelector(`.${props.className}-item`)
        ?.clientHeight || 0
    })
  });
</script>

<script lang="ts">
  export default {
    name: 'SearchForm',
  };
</script>

<style lang="less" scoped>
  .showMore {
    padding: 0 5px;
    line-height: 20px;
    height: 20px;
  }
  .collapse,
  .expand {
    transition: height 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
  .arco-form-item-layout-inline {
    // margin-right: 0;
  }
  .arco-form-item {
    margin-bottom: 8px;
  }
  .search-box {
    .arco-col {
      padding-right: 2px !important;
    }
  }
</style>
