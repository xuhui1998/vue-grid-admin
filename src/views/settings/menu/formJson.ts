export const tableFormJson = [
  // {
  //   name: 'is_menu',
  //   label: '是否一级菜单',
  //   type: 'a-switch',
  //   checkedValue: '1',
  //   unCheckedValue: '0',
  //   labelWidth: 90,
  //   index: 1,
  // },
  // {
  //   name: 'parent_id',
  //   label: '上级菜单',
  //   type: 'a-cascader',
  //   placeholder: '请选择上级菜单',
  //   fieldNames: { value: 'id', label: 'name' },
  //   options: [],
  //   checkStrictly: true,
  //   labelWidth: 90,
  //   index: 2,
  // },
  {
    name: 'name',
    label: '菜单名称',
    type: 'a-input',
    placeholder: '请输入菜单名称',
    labelWidth: 90,
    index: 3,
  },
  {
    name: 'path',
    label: '菜单路径',
    type: 'a-input',
    placeholder: '请输入菜单路径',
    labelWidth: 90,
    index: 4,
  },
  {
    name: 'name_key',
    label: '路由名称',
    type: 'a-input',
    placeholder: '请输入路由名称',
    labelWidth: 90,
    index: 5,
  },
  {
    name: 'component',
    label: '路由Path',
    type: 'a-input',
    placeholder: '请输入路由地址',
    disabled: false,
    labelWidth: 90,
    index: 6,
  },
  {
    name: 'sort',
    label: '排序',
    type: 'a-input-number',
    placeholder: '请输入菜单序号',
    min: 0,
    labelWidth: 90,
    index: 8,
    mode: 'button',
  },
  // {
  //   name: 'icon',
  //   label: '图标',
  //   type: 'a-input',
  //   placeholder: '请选择图标',
  // },
  {
    name: 'status',
    label: '隐藏菜单',
    type: 'a-radio-group',
    elType: 'button',
    labelWidth: 90,
    options: [
      {
        value: '1',
        label: '显示',
      },
      {
        value: '0',
        label: '隐藏',
      },
    ],
    index: 9,
  },
  // {
  //   name: 'requiresAuth',
  //   label: '页面鉴权',
  //   type: 'a-radio-group',
  //   elType: 'button',
  //   options: [
  //     {
  //       value: '',
  //       label: '否',
  //     },
  //     {
  //       value: true,
  //       label: '是',
  //     },
  //   ],
  // },
  {
    name: 'is_cache',
    label: '页面缓存',
    type: 'a-radio-group',
    elType: 'button',
    labelWidth: 90,
    options: [
      {
        value: '0',
        label: '否',
      },
      {
        value: '1',
        label: '是',
      },
    ],
    index: 10,
  },
];

export const authFormJson = [
  {
    name: 'name',
    label: '权限名称',
    type: 'a-input',
    placeholder: '请输入权限名称',
    labelWidth: 90,
  },
  {
    name: 'api_url',
    label: '权限代码',
    type: 'a-input',
    placeholder: '请输入权限代码',
    labelWidth: 90,
  },
  {
    name: 'status',
    label: '权限状态',
    type: 'a-radio-group',
    labelWidth: 90,
    elType: 'button',
    options: [
      {
        value: '1',
        label: '启用',
      },
      {
        value: '0',
        label: '禁用',
      }
    ]
  },
];

export default null;
