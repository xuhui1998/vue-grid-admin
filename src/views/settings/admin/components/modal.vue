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
        :form-json="newFormJson"
        :form-state="state.formModel"
        :rules="type === 'add' ? addRules : editRules"
      ></TableForm>
    </template>
  </GlobalModal>
</template>

<script setup lang="ts">
  import { reactive, toRefs, ref, computed, onMounted } from 'vue';
  import { omit } from 'lodash';
  import { adminInfo, roleList } from '@/api/settings';
  import { getStandardArr } from '@/utils';
  import { ModalType } from '@/types/global';
  import { adminFormJson } from '../formJson';
  import { AdminFormDto } from '@/dto/setting/admin';

  const props = defineProps<{
    visible: boolean;
    title: string;
    type: ModalType;
    record: Record<string, any> | undefined;
  }>()
  const { visible, title, type, record } = toRefs(props);

  const addRules = {
    real_name: [
      {
        required: true,
        message: `所属人员不能为空!`,
      },
    ],
    account: [
      {
        required: true,
        message: `账号不能为空!`,
      },
    ],
    password: [
      {
        required: true,
        message: `密码不能为空!`,
      },
      {
        minLength: 6,
        message: `密码不能少于六位!`,
      },
    ],
    comfirmpwd: [
      {
        required: true,
        message: `密码不能为空!`,
      },
      {
        minLength: 6,
        message: `密码不能少于六位!`,
      },
      {
        validator: (value: string, cb: (text?: string) => void) => {
          if (value !== state.formModel.password) {
            cb('两次输入密码不一致')
          } else {
            cb()
          }
        }
      }
    ],
    role_id: [
      {
        required: true,
        message: `角色不能为空!`,
      },
    ],
  };
  const editRules = {
    real_name: [
      {
        required: true,
        message: `所属人员不能为空!`,
      },
    ],
    account: [
      {
        required: true,
        message: `账号不能为空!`,
      },
    ],
    password: [
      {
        minLength: 6,
        message: `密码不能少于六位!`,
      },
    ],
    comfirmpwd: [
      {
        minLength: 6,
        message: `密码不能少于六位!`,
      },
      {
        validator: (value: string, cb: (text?: string) => void) => {
          if (state.formModel.password && value !== state.formModel.password) {
            cb('两次输入密码不一致')
          } else {
            cb()
          }
        }
      }
    ],
    role_id: [
      {
        required: true,
        message: `角色不能为空!`,
      },
    ],
  };
  
  const state = reactive({
    formModel: new AdminFormDto(),
    roleList: [] as Array<{ id: string; name: string }>,
  });
  const formRef = ref();
  const newFormJson = computed(() => {
    return adminFormJson.map((item: any) => {
      if (item.name === 'role_id') {
        return {
          ...item,
          options: state.roleList,
        };
      }
      return { ...item };
    });
  });

  const emit = defineEmits(['onOk', 'onCancel']);
  const handleCancel = async () => {
    emit('onCancel', false);
  };
  const handleOk = async () => {
    const res = await formRef.value.tableForm?.validate();
    if (!res) {
      emit('onOk', false, state.formModel);
    }
  };

  const getRoleList = async () => {
    const { data } = await roleList({});
    state.roleList = getStandardArr(data);
  };

  const getAdminInfo = async () => {
    const { data, code } = await adminInfo({ admin_id: record.value.id });
    if (code === 200) {
      const omitArr = ['last_time', 'role_list', 'is_screen_ad', 'group_name', 'group_id']
      state.formModel = { ...state.formModel, ...omit(data, omitArr) } as AdminFormDto;
    }
  };

  onMounted(() => {
    getRoleList();
    if(type.value === 'edit') {
      getAdminInfo();
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
