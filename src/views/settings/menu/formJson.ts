export const tableFormJson = [
  {
    name: 'locale',
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
    name: 'name',
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
    name: 'order',
    label: '排序',
    type: 'a-input-number',
    placeholder: '请输入菜单序号',
    min: 0,
    labelWidth: 90,
    index: 8,
    mode: 'button',
  },
  {
    name: 'hideInMenu',
    label: '隐藏菜单',
    type: 'a-radio-group',
    elType: 'button',
    labelWidth: 90,
    options: [
      {
        value: false,
        label: '显示',
      },
      {
        value: true,
        label: '隐藏',
      },
    ],
    index: 9,
  },
  {
    name: 'ignoreCache',
    label: '页面缓存',
    type: 'a-radio-group',
    elType: 'button',
    labelWidth: 90,
    options: [
      {
        value: false,
        label: '否',
      },
      {
        value: true,
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

export const rules = {
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

export default null;
