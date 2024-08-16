export const groupArr = [
  {
    value: '1',
    label: '技术',
  },
  {
    value: '2',
    label: '商务',
  },
  {
    value: '3',
    label: '编辑',
  },
  {
    value: '4',
    label: '运营',
  },
  {
    value: '5',
    label: '推广',
  },
  {
    value: '6',
    label: '产品',
  },
];

export const searchFormJson = [
  // {
  //   name: 'admin_id',
  //   label: 'ID',
  //   type: 'a-input',
  //   placeholder: '请输入所属人员ID',
  //   options: [],
  // },
  {
    name: 'real_name',
    label: '人员名称',
    type: 'a-input',
    placeholder: '请输入所属人员名称',
    options: [],
    hideLabel: true,
  },
  {
    name: 'account',
    label: '账号',
    type: 'a-input',
    placeholder: '请输入所属人员账号',
    options: [],
    hideLabel: true,
  },
  // {
  //   name: 'status',
  //   label: '状态',
  //   type: 'a-select',
  //   placeholder: '请选择状态',
  //   options: [
  //     {
  //       value: '',
  //       label: '全部',
  //     },
  //     {
  //       value: '1',
  //       label: '正常',
  //     },
  //     {
  //       value: '2',
  //       label: '禁用',
  //     },
  //   ],
  // },
];

export const adminFormJson = [
  {
    name: 'real_name',
    label: '人员名称',
    type: 'a-input',
    placeholder: '请输入所属人员名称',
    options: [],
  },
  {
    name: 'account',
    label: '账号',
    type: 'a-input',
    placeholder: '请输入用户账号',
    options: [],
  },
  {
    name: 'password',
    label: '密码',
    type: 'a-input',
    placeholder: '请输入用户密码',
    options: [],
  },
  {
    name: 'comfirmpwd',
    label: '确认密码',
    type: 'a-input',
    placeholder: '确认用户密码',
  },
  {
    name: 'role_id',
    label: '角色',
    type: 'a-select',
    placeholder: '请选择角色',
    fieldNames: { value: 'id', label: 'name' },
    options: [],
  },
  {
    name: 'status',
    label: '人员状态',
    type: 'a-switch',
    checkedValue: 1,
    unCheckedValue: 0,
    checkedText: '正常',
    unCheckedText: '禁用',
  },
  {
    name: 'is_super',
    label: '超级管理员',
    type: 'a-switch',
    checkedValue: 1,
    unCheckedValue: 0,
    checkedText: '是',
    unCheckedText: '否',
  },
];

export default null;
