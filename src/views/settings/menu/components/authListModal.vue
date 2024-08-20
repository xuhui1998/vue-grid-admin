<!-- <template>
  <a-drawer
    :width="width"
    :visible="visible"
    unmount-on-close
    @ok="handleOk"
    @cancel="cancel"
  >
    <template #title> {{ title }} </template>
    <a-button
      v-permission="'menu.addApi'"
      class="mb-20"
      type="primary"
      @click="openAuthModal('add')"
    >
      添加权限
    </a-button>
    <GridTable
      ref="gridTable"
      :load-url="commonApiUrl.authListUrl"
      :form-data="{ menu_id: menuId }"
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
      <template #operation="{ record }">
        <a-button
          v-permission="'menu.editApi'"
          class="btn-text"
          type="text"
          @click="openAuthModal('edit', record)"
          >编辑</a-button
        >
        <a-button
          v-permission="'menu.delApi'"
          class="btn-text"
          type="text"
          status="danger"
          @click="delAuthBtn(record)"
          >删除</a-button
        >
      </template>
    </GridTable>
    <AuthModal
      v-if="state.visible"
      :visible="state.visible"
      :title="state.type === 'add' ? '添加权限' : '修改权限'"
      :record="state.record"
      :type="state.type"
      @on-ok="handleAuthOk"
      @on-cancel="handleAuthCancel"
    />
  </a-drawer>
</template>

<script lang="ts" setup>
  import {
    ref,
    toRefs,
    reactive,
    watch,
    computed,
    defineAsyncComponent,
  } from 'vue';
  import { commonApiUrl } from '@/api/common-api-url';
  import { Message, Modal, TableColumnData } from '@arco-design/web-vue';
  import { ModalType } from '@/types/global';
  import { addAuth, editAuth, delAuth } from '@/api/settings';
  import { MenuOperationAuthDto } from '@/dto/setting/menu/menuDto';

  const AuthModal = defineAsyncComponent(() => import('./authModal.vue'));

  const props = defineProps<{
    visible: boolean;
    menuId: string;
    width: number;
    title: string;
  }>();
  const { visible, title, menuId, width } = toRefs(props);

  const columns = computed<TableColumnData[]>(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '权限',
      dataIndex: 'api_url',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      slotName: 'status',
      align: 'center',
    },
    {
      title: '操作',
      slotName: 'operation',
      align: 'center',
    },
  ]);

  const gridTable = ref();
  const state = reactive({
    visible: false,
    type: '' as ModalType,
    record: {} as Record<string, any> | undefined,
  });

  const emit = defineEmits(['onOk', 'onCancel']);
  const handleOk = () => {
    emit('onOk', false);
  };

  const cancel = () => {
    emit('onCancel', false);
  };

  const openAuthModal = (type: ModalType, record?: Record<string, any>) => {
    state.type = type;
    state.record = record;
    state.visible = true;
  };

  const delAuthBtn = (record: Record<string, any>) => {
    Modal.warning({
      title: '提示',
      content: '确认删除当前页面权限吗?',
      modalStyle: { textAlign: 'center' },
      hideCancel: false,
      onOk: async () => {
        const { code } = await delAuth({ id: record.id });
        if (code === 200) {
          Message.success('删除成功');
          gridTable.value.loadRemoteData();
        }
      },
    });
  };
  
  const handleAuthOk = async (formModel: MenuOperationAuthDto) => {
    if (state.type === 'add') {
      const { code } = await addAuth({
        ...formModel,
        parent_id: menuId.value,
      });
      if (code === 200) {
        Message.success('添加成功');
        state.visible = false;
        gridTable.value.loadRemoteData();
      }
    } else {
      const { code } = await editAuth({
        ...formModel,
        parent_id: menuId.value,
      });
      if (code === 200) {
        Message.success('修改成功');
        state.visible = false;
        gridTable.value.loadRemoteData();
      }
    }
  };

  const handleAuthCancel = () => {
    state.visible = false;
  };

  watch(
    () => gridTable.value?.tableState.data,
    (val) => {},
    { deep: true, immediate: true }
  );
</script>

<style lang="less" scoped></style> -->
