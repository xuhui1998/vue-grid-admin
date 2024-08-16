<template>
  <GlobalModal
    :visible="visible"
    :title="title"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #content>
      <TableForm
        ref="formRef"
        :rules="rules"
        :form-json="tableFormJson"
        :form-state="state.formState"
        :display="filterFormJson"
      >
        <template #custom>
          <a-col :span="22" data-index="1">
            <a-form-item label="上级菜单" label-col-flex="90px">
              <a-cascader
                v-model="state.formState.parent_id"
                placeholder="请选择上级菜单"
                allow-search
                :options="[{ label: '一级菜单', id: '0' }, ...state.menuList]"
                :field-names="{ value: 'id', label: 'label' }"
                check-strictly
              ></a-cascader>
            </a-form-item>
          </a-col>
          <a-col :span="22" data-index="7">
            <a-form-item label="图标" label-col-flex="90px">
              <a-input
                v-model="state.formState.icon"
                placeholder="请选择图标"
                @focus="() => (state.drawerVisible = true)"
              >
                <template #prepend>
                  <span v-if="state.formState.icon">
                    <component
                      :is="state.formState.icon"
                      v-if="
                        state.formState.icon.substring(0, 4).toLowerCase() ===
                        'icon'
                      "
                      :size="18"
                    ></component>
                    <SvgIcon
                      v-if="
                        state.formState.icon.substring(0, 4).toLowerCase() !==
                        'icon'
                      "
                      :icon-class="state.formState.icon"
                      :size="18"
                    ></SvgIcon>
                  </span>
                </template>
              </a-input>
              <a-button @click="openIconDrawer">选择图标</a-button>
            </a-form-item>
          </a-col>
        </template>
      </TableForm>
      <a-drawer
        ref="drawer"
        :width="450"
        :visible="state.drawerVisible"
        unmount-on-close
        hide-cancel
        @ok="handleDrawerOk"
        @cancel="handleDrawerCancel"
      >
        <template #title> 选择图标 </template>
        <a-affix :offset-top="10" target=".arco-drawer-body">
          <a-input
            v-model="state.formState.icon"
            class="mb-10"
            placeholder="请选择图标"
            @input="handleInput"
          >
            <template #prepend>
              <span v-if="state.formState.icon">
                <component
                  :is="state.formState.icon"
                  v-if="
                    state.formState.icon.substring(0, 4).toLowerCase() ===
                    'icon'
                  "
                  :size="18"
                ></component>
                <SvgIcon
                  v-if="
                    state.formState.icon.substring(0, 4).toLowerCase() !==
                    'icon'
                  "
                  :icon-class="state.formState.icon"
                  :size="18"
                ></SvgIcon>
              </span>
            </template>
          </a-input>
        </a-affix>

        <a-tabs v-model:active-key="state.currentTabKey" @tab-click="tabClick">
          <a-tab-pane key="1" title="系统">
            <a-row v-if="IconComponents.length > 0" :gutter="[15, 10]">
              <template
                v-for="(icon, index) in IconComponents"
                :key="icon.name"
              >
                <a-col v-if="icon.name" :span="8">
                  <div
                    :class="[
                      'icon-item',
                      'flex-center',
                      { active: state.currentIndex === index },
                    ]"
                    @click="handleIconClick(icon, index)"
                  >
                    <component :is="icon" class="icon" :size="20"></component>
                    <div class="icon-name mt-5">{{ icon.name }}</div>
                  </div>
                </a-col>
              </template>
            </a-row>
            <a-empty v-else></a-empty>
          </a-tab-pane>
          <a-tab-pane key="2" title="IconFont">
            <a-row v-if="iconFontArr.length > 0" :gutter="[15, 10]">
              <a-col v-for="(icon, index) in iconFontArr" :key="icon" :span="8">
                <div
                  v-if="icon"
                  :class="[
                    'icon-item',
                    'flex-center',
                    { active: state.currentIndex === index },
                  ]"
                  @click="handleIconClick(icon, index)"
                >
                  <SvgIcon :icon-class="icon" :size="20"></SvgIcon>
                  <div class="icon-name mt-5">{{ icon }}</div>
                </div>
              </a-col>
            </a-row>
            <a-empty v-else></a-empty>
          </a-tab-pane>
        </a-tabs>
      </a-drawer>
    </template>
  </GlobalModal>
</template>

<script setup lang="ts">
  import { ref, shallowRef, reactive, toRefs, watch, onMounted } from 'vue';
  import { ModalType } from '@/types/global';
  import { getStandardArr } from '@/utils';
  import * as Icons from '@arco-design/web-vue/es/icon';
  import { debounce, cloneDeep } from 'lodash';
  import { menuListAll } from '@/api/settings';
  import { tableFormJson } from '../formJson';
  import { MenuConfigProps, MenuItems } from '../types';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title: string;
      type: ModalType;
      record?: any;
    }>(),
    {
      visible: false,
      title: '',
      type: undefined,
      record: {},
    }
  );
  const { visible, title, type, record } = toRefs(props);

  const IconComponents = shallowRef<any[]>([]);
  const IconComponentsCopy = shallowRef<any[]>([]);
  const iconFontArr = ref<string[]>([]);
  const iconFontArrCopy = ref<string[]>([]);
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, component] of Object.entries(Icons)) {
    IconComponents.value.push(component);
  }
  IconComponentsCopy.value = cloneDeep(IconComponents.value);

  const extractFileName = (filePath: string) => {
    const lastIndex = filePath.lastIndexOf('/');
    const fileNameWithExtension = filePath.substring(lastIndex + 1);
    const dotIndex = fileNameWithExtension.lastIndexOf('.');
    const fileName = fileNameWithExtension.substring(0, dotIndex);
    return fileName;
  };

  const modules = import.meta.glob('@/assets/icons/*.svg');
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, component] of Object.entries(modules)) {
    iconFontArr.value.push(extractFileName(key));
  }
  iconFontArrCopy.value = cloneDeep(iconFontArr.value);

  const rules = {
    parent_id: [
      {
        required: true,
        message: `父级菜单不能为空!`,
      },
    ],
    name: [
      {
        required: true,
        message: `菜单名称不能为空!`,
      },
    ],
    path: [
      {
        required: true,
        message: `菜单路径不能为空!`,
      },
    ],
    sort: [
      {
        required: true,
        message: `排序不能为空!`,
      },
    ],
    component: [
      {
        required: true,
        message: `路由Path为空!`,
      },
    ],
  };

  const formRef = ref();
  const drawer = ref();
  const currentIcon = shallowRef();
  const state = reactive({
    visible: false,
    drawerVisible: false,
    formState: new MenuConfigProps(),
    roleList: [],
    menuList: [] as MenuItems[],
    currentIndex: null as number | null,
    currentTabKey: '1' as string | number,
  });

  const filterFormJson = () => {
    tableFormJson.forEach((item) => {
      if (item.name === 'component') {
        item.disabled = state.formState.parent_id === '0';
        state.formState.component =
          // eslint-disable-next-line no-nested-ternary
          state.formState.parent_id === '0'
            ? 'Layout'
            : type.value === 'add'
            ? ''
            : state.formState.component;
      }
      // if (item.name === 'parent_id') {
      //   item.options = [{ name: '一级菜单', id: '0' }, ...state.menuList];
      // }
      if (item.name === 'menu_ids') {
        item.options = getStandardArr(state.roleList);
      }
    });
    return tableFormJson;
  };

  const emit = defineEmits(['onOk', 'onCancel']);
  const handleOk = async () => {
    const res = await formRef.value.tableForm?.validate();
    if (res) return;
    const { formModel } = formRef.value;
    emit('onOk', formModel);
  };
  const handleCancel = async () => {
    emit('onCancel');
  };

  const tabClick = (key: string | number) => {
    state.currentIndex = null;
    state.currentTabKey = key;
  };

  const handleIconClick = (icon: any, index: number) => {
    state.currentIndex = index;
    currentIcon.value = icon;
    state.formState.icon = state.currentTabKey === '1' ? icon.name : icon;
  };

  const searchIconFont = (value: any) => {
    if (value === '') {
      iconFontArr.value = iconFontArrCopy.value;
      return;
    }
    // 将要匹配的值转换为小写
    const lowercaseValue = value.toLowerCase();
    iconFontArr.value = iconFontArrCopy.value.filter((icon) => {
      if (icon && icon.toLowerCase().indexOf(lowercaseValue) !== -1) {
        return icon;
      }
    });
  };

  const searchDefaultIcon = (value: any) => {
    if (value === '') {
      IconComponents.value = IconComponentsCopy.value;
      return;
    }
    // 将要匹配的值转换为小写
    const lowercaseValue = value.toLowerCase();
    IconComponents.value = IconComponentsCopy.value.filter((icon) => {
      if (icon.name && icon.name.toLowerCase().indexOf(lowercaseValue) !== -1) {
        return { ...icon };
      }
    });
  };

  // 搜索输入防抖
  const handleInput = debounce((value) => {
    // console.log('debounce =>', value);
    if (state.currentTabKey == '1') {
      searchDefaultIcon(value);
    } else if (state.currentTabKey == '2') {
      searchIconFont(value);
    }
  }, 500);

  const openIconDrawer = () => {
    state.drawerVisible = true
    state.currentTabKey = '1';
  };

  const handleDrawerOk = () => {
    state.drawerVisible = false;
  };

  const handleDrawerCancel = () => {
    state.drawerVisible = false;
  };

  const setMenuLabel = (menuList: MenuItems[]) => {
    return menuList.map((menu: MenuItems) => {
      if (menu.children) {
        menu.children = setMenuLabel(menu.children);
      }
      return {
        ...menu,
        label: menu.meta.locale,
      };
    });
  };

  const getMenuList = async () => {
    const { data } = await menuListAll();
    state.menuList = setMenuLabel(data);
  };

  watch(
    () => record.value,
    (val) => {
      if (type.value === 'edit') {
        state.formState = val;
        // currentIcon.value = val?.icon;
        state.currentTabKey =
          val.icon?.substring(0, 4).toLowerCase() === 'icon' ? '1' : '2';
        state.formState.sort = Number(state.formState.sort);
      }
    },
    { deep: true, immediate: true }
  );

  onMounted(() => {
    getMenuList();
  });
</script>

<style lang="less" scoped>
  .icon-item {
    padding: 10px;
    border: 1px solid #eee;
    transition: all 0.2s ease;
    cursor: pointer;
    .icon-name {
      font-size: 13px;
      width: 100%;
      overflow: hidden;
      text-align: center;
      white-space: nowrap;
    }
  }
  .icon-item:hover {
    background-color: var(--color-fill-2);
    .icon {
      transform: scale(1.3);
    }
  }
  .icon-item.active {
    border-color: rgb(var(--arcoblue-6));
    color: rgb(var(--arcoblue-6));
  }
</style>
