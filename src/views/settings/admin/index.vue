<template>
  <Container>
    <template #form>
      <Wrapper title="筛选维度">
        <SearchForm
          ref="searchForm"
          v-model="state.searchModel"
          :form-json="searchFormJson"
          :columns="5"
          @on-search="onSearch"
          @on-reset="onReset"
        ></SearchForm>
      </Wrapper>
    </template>
    <template #content>
      <Wrapper>
        <template #title>
          <a-space>
            <a-button type="primary" @click="showModal('add')">
              <template #icon>
                <icon-plus />
              </template>
              新增用户
            </a-button>
          </a-space>
        </template>
        <GridTable
          ref="gridTable"
          :load-url="commonApiUrl.adminListUrl"
          :form-data="state.searchModel"
          :columns="(columns as TableColumnData[])"
        >
          <template #status="{ record }">
            <a-tag v-if="record.status == 1" color="green">
              <template #icon>
                <IconCheckCircle />
              </template>
              启用
            </a-tag>
            <a-tag v-else color="red">
              <template #icon>
                <IconCloseCircle />
              </template>
              禁用
            </a-tag>
          </template>
          <template #edit="{ record }">
            <a-button type="text" @click="showModal('edit', record)"
              >修改</a-button
            >
          </template>
        </GridTable>
      </Wrapper>
      <Modal
        v-if="state.modalVisible"
        :visible="state.modalVisible"
        :type="state.type"
        :record="state.record"
        :title="state.type == 'add' ? '新增用户' : '修改用户信息'"
        @on-ok="handleOk"
        @on-cancel="handleCancel"
      />
    </template>
  </Container>
</template>

<script lang="ts" setup>
  import { ref, defineAsyncComponent, computed, reactive, watch } from 'vue';
  import type { TableColumnData } from '@arco-design/web-vue';
  import { Message } from '@arco-design/web-vue';
  import { commonApiUrl } from '@/api/common-api-url';
  import { addAdmin, editAdmin } from '@/api/settings';
  import { ModalType } from '@/types/global';
  import { AdminFormDto } from '@/dto/setting/admin';
  import { searchFormJson } from './formJson';

  const Modal = defineAsyncComponent(() => import('./components/modal.vue'));

  const columns = computed<TableColumnData[]>(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '用户昵称',
      dataIndex: 'nick_name',
      align: 'center',
    },
    {
      title: '账号',
      dataIndex: 'user_name',
      align: 'center',
    },
    {
      title: '角色',
      dataIndex: 'role_name',
      align: 'center',
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      slotName: 'status',
      align: 'center',
    },
    {
      title: '操作',
      slotName: 'edit',
      align: 'center',
    },
  ]);

  const searchForm = ref();
  const gridTable = ref();
  const state = reactive({
    searchModel: {},
    modalVisible: false,
    type: '' as ModalType,
    record: {} as Record<string, any> | undefined,
  });

  const onSearch = () => {
    gridTable.value.onSearch();
  };

  const onReset = () => {
    gridTable.value.onSearch();
  };

  const showModal = (type: ModalType, record?: Record<string, any>) => {
    state.type = type;
    state.record = record;
    state.modalVisible = true;
  };

  const handleOk = async (val: boolean, formModel: AdminFormDto) => {
    if (state.type === 'add') {
      const { code } = await addAdmin(formModel);
      if (code === 200) {
        state.modalVisible = val;
        Message.success('添加成功');
        gridTable.value.loadRemoteData();
      }
    } else {
      const { code } = await editAdmin(formModel);
      if (code === 200) {
        state.modalVisible = val;
        Message.success('修改成功');
        gridTable.value.loadRemoteData();
      }
    }
  };

  const handleCancel = (val: boolean) => {
    state.modalVisible = val;
  };
</script>

<script lang="ts">
  export default {
    name: 'Admin',
  };
</script>

<style lang="less" scoped></style>
