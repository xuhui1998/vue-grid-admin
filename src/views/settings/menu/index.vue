<template>
  <Container>
    <template #content>
      <Wrapper>
        <template #title>
          <a-space>
            <a-button
              type="primary"
              @click="openModal('add')"
            >
              <template #icon><IconPlus /></template>
              添加菜单
            </a-button>
            <a-button type="primary" @click="gridTable?.loadRemoteData()">
              <template #icon><IconRefresh /></template>
              刷新
            </a-button>
          </a-space>
        </template>
        <GridTable
          ref="gridTable"
          :load-url="commonApiUrl.menuListUrl"
          :columns="(columns as TableColumnData[])"
          :page-size="100"
          show-empty-tree
        >
          <template #menuName="{ record }">
            <template
              v-if="record.meta.icon?.substring(0, 4).toLowerCase() === 'icon'"
            >
              <component
                :is="record.meta?.icon"
                v-if="record.meta?.icon"
                class="icon"
                :size="20"
                :style="{ color: 'var(--color-text-2)' }"
              ></component>
            </template>
            <template v-else>
              <component
                :is="SvgIcon"
                v-if="record.meta?.icon"
                class="icon"
                :icon-class="record.meta?.icon"
                :size="20"
                :style="{ color: 'var(--color-text-2)' }"
              ></component>
            </template>
            <span class="menu-name">{{ record.meta.locale }}</span>
          </template>
          <template #order="{ record }">
            <span>{{ record.meta.order }}</span>
          </template>
          <template #routePath="{ record }">
            <span>{{ record.component }}</span>
          </template>
          <template #hideInMenu="{ record }">
            <a-tag v-if="!record.meta.hideInMenu" color="green">
              <template #icon>
                <IconCheckCircle />
              </template>
              展示
            </a-tag>
            <a-tag v-else color="red">
              <template #icon>
                <IconCloseCircle />
              </template>
              隐藏
            </a-tag>
          </template>
          <template #requiresAuth="{ record }">
            <a-tag v-if="record.meta.requiresAuth" color="green">
              <template #icon>
                <IconCheckCircle />
              </template>
              是
            </a-tag>
            <a-tag v-else color="red">
              <template #icon>
                <IconCloseCircle />
              </template>
              否
            </a-tag>
          </template>
          <template #ignoreCache="{ record }">
            <a-tag v-if="!record.meta.ignoreCache" color="green">
              <template #icon>
                <IconCheckCircle />
              </template>
              是
            </a-tag>
            <a-tag v-else color="red">
              <template #icon>
                <IconCloseCircle />
              </template>
              否
            </a-tag>
          </template>
          <template #operation="{ record }">
            <a-button
              v-if="!record.children"
              class="btn-text"
              type="text"
              @click="setMenuAuth(record)"
              >权限</a-button
            >
            <a-button
              class="btn-text"
              type="text"
              @click="openModal('edit', record)"
              >编辑</a-button
            >
            <a-button
              class="btn-text"
              status="danger"
              type="text"
              @click="deleteMenu(record)"
              >删除</a-button
            >
          </template>
        </GridTable>
      </Wrapper>
      <MenuModal
        v-if="state.visible"
        :visible="state.visible"
        :type="state.type"
        :record="state.record"
        :title="state.type === 'add' ? '新增菜单' : '修改菜单'"
        @on-ok="handleOk"
        @on-cancel="cancel"
      />
      <AuthListDrawer
        v-if="state.drawerVisible"
        :visible="state.drawerVisible"
        :title="`${state.record.name}权限`"
        :menu-id="state.record.id"
        :width="1000"
        @on-ok="drawerOk"
        @on-cancel="drawerCancel"
      />
    </template>
  </Container>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, defineAsyncComponent } from 'vue';
  import {
    Message,
    Modal,
    TableColumnData,
    TableData,
  } from '@arco-design/web-vue';
  import { commonApiUrl } from '@/api/common-api-url';
  import SvgIcon from '@/components/svg-icon/index.vue';
  import {
    menuDetail,
    saveMenu,
    delMenu,
  } from '@/api/settings';
  import { ModalType } from '@/types/global';
  import { MenuConfigProps } from './types';

  const MenuModal = defineAsyncComponent(
    () => import('./components/modal.vue')
  );
  const AuthListDrawer = defineAsyncComponent(
    () => import('./components/authListModal.vue')
  );

  const columns = computed<TableColumnData[]>(() => [
    {
      title: '菜单名称',
      slotName: 'menuName',
      align: 'left',
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      align: 'left',
    },
    {
      title: '路由名称',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '路由Path',
      slotName: 'routePath',
      align: 'left',
    },
    {
      title: '排序',
      slotName: 'order',
      align: 'center',
      width: 120,
    },
    {
      title: '是否展示',
      slotName: 'hideInMenu',
      align: 'center',
      width: 120,
    },
    {
      title: '登录鉴权',
      slotName: 'requiresAuth',
      align: 'center',
      width: 120,
    },
    {
      title: '是否缓存',
      slotName: 'ignoreCache',
      align: 'center',
      width: 120,
    },
    {
      title: '操作',
      slotName: 'operation',
      align: 'center',
      width: 150,
    },
  ]);

  const gridTable = ref();
  const state = reactive({
    visible: false,
    type: '' as ModalType,
    record: {} as Record<string, any>,
    drawerVisible: false,
  });

  const openModal = async (type: ModalType, record?: TableData) => {
    state.type = type;
    state.visible = true;
    if (type === 'edit') {
      const { data } = await menuDetail({ id: record?.id });
      state.record = data;
    }
  };

  /**
   * 设置菜单权限
   */
  const setMenuAuth = (record: Record<string, any>) => {
    state.record = record;
    state.drawerVisible = true;
  };

  const handleOk = async (formModel: MenuConfigProps) => {
    if (state.type === 'add') {
      const { code } = await saveMenu(formModel);
      if (code === 200) {
        Message.success('添加成功');
        state.visible = false;
        gridTable.value.loadRemoteData();
      }
    } else {
      const { code } = await saveMenu(formModel);
      if (code === 200) {
        Message.success('修改成功');
        state.visible = false;
        gridTable.value.loadRemoteData();
      }
    }
  };

  const deleteMenu = (record: TableData) => {
    Modal.warning({
      title: '提示',
      content: '确认删除当前菜单吗?',
      modalStyle: { textAlign: 'center' },
      hideCancel: false,
      onOk: async () => {
        const { code } = await delMenu({ id: record?.id });
        if (code === 200) {
          Message.success('删除成功');
          gridTable.value.loadRemoteData();
        }
      },
    });
  };

  const cancel = () => {
    state.visible = false;
  };

  const drawerOk = () => {
    state.drawerVisible = false;
  };

  const drawerCancel = () => {
    state.drawerVisible = false;
  };
</script>

<script lang="ts">
  export default {
    name: 'MenuManagement',
  };
</script>

<style lang="less" scoped>
  .icon,
  .menu-name {
    margin-left: 5px;
    vertical-align: middle;
  }
</style>
