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
        :form-json="authFormJson"
        :form-state="state.formModel"
        :rules="rules"
      ></TableForm>
    </template>
  </GlobalModal>
</template>

<script setup lang="ts">
  import { reactive, toRefs, ref, onMounted } from 'vue';
  import { authFormJson } from '../formJson';
  import { MenuOperationAuthDto } from '@/dto/setting/menu/menuDto'
  import { omit } from 'lodash';
  import { ModalType } from '@/types/global';

  const props = defineProps<{
    visible: boolean;
    title: string;
    type: ModalType;
    record: Record<string, any> | undefined;
  }>();

  const rules = {
    name: [
      {
        required: true,
        message: `权限名称不能为空!`,
      },
    ],
    api_url: [
      {
        required: true,
        message: `权限代码不能为空!`,
      },
    ],
  };
  const { visible, title, type, record } = toRefs(props);
  const state = reactive({
    formModel: new MenuOperationAuthDto(),
  });
  const formRef = ref();

  const emit = defineEmits(['onOk', 'onCancel']);
  const handleCancel = async () => {
    emit('onCancel');
  };
  const handleOk = async () => {
    const res = await formRef.value.tableForm?.validate();
    if (!res) {
      emit('onOk', state.formModel);
    }
  };

  onMounted(() => {
    if (type.value === 'edit') {
      state.formModel = omit(record.value, ['created_time', 'last_updated_time']) as MenuOperationAuthDto;
    }
  });
</script>

<style scoped lang="less">
  .arco-btn {
    width: 80px;
  }
  .arco-col {
    text-align: center;
  }
</style>
