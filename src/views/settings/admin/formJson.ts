/*
 * @Author: mizao 1253767373@qq.com
 * @Date: 2024-08-15 15:58:41
 * @LastEditors: mizao 1253767373@qq.com
 * @LastEditTime: 2025-05-30 16:06:46
 * @FilePath: /vue-grid-admin/src/views/settings/admin/formJson.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const searchFormJson = [
  {
    name: 'user_id',
    label: '用户名称',
    type: 'a-select',
    placeholder: '请选择用户',
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
    name: 'nick_name',
    label: '用户昵称',
    type: 'a-input',
    placeholder: '请输入用户昵称',
    options: [],
  },
  {
    name: 'username',
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
    label: '用户状态',
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
