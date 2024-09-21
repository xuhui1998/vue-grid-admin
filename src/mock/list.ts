import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

const getProjectTrendsList = () => {
  return [
    {
      id: 1,
      title: 'xuhui',
      browse: '675',
      comment: '39',
      avatar:
        'https://profile-avatar.csdnimg.cn/c430e3997f2844ae819f81f40436bc69_m0_48995032.jpg',
      content: '创建了项目',
      link: 'Grid Admin',
      time: '一个月前',
    },
    {
      id: 2,
      title: '小鱼',
      browse: '2.4k',
      comment: '24',
      avatar:
        'http://lc-KyqgG0La.cn-n1.lcfile.com/0SNplirEV8GUtaTTTsClE8B9i7KTRL42/WechatIMG75.jpg',
      content: '提交了bug',
      link: '用户关联校验失效',
      time: '一周前',
    },
    {
      id: 3,
      title: '肥鯮',
      browse: '1.3k',
      comment: '83',
      avatar:
        'http://lc-KyqgG0La.cn-n1.lcfile.com/exWs7HQLR2Q8CEzGmpjKucR9lA8yIUNJ/WechatIMG74.jpg',
      content: '更新了个人动态',
      link: '怎么又下雨啦！！！',
      time: '三天前',
    },
    {
      id: 4,
      title: 'xuhui',
      browse: '179',
      comment: '5',
      avatar:
        'https://profile-avatar.csdnimg.cn/c430e3997f2844ae819f81f40436bc69_m0_48995032.jpg',
      content: '修改了bug',
      link: 'layout布局失效',
      time: '三天前',
    },
    {
      id: 5,
      title: '全职干饭',
      thumbs_up: '56',
      browse: '2.4k',
      comment: '56',
      avatar:
        'http://lc-KyqgG0La.cn-n1.lcfile.com/wSA6JjIbo3X2BffFljmdJeJxhQpTVVr3/WechatIMG73.jpg',
      content: '分享了文章',
      link: '《教你不一样的flex布局用法》',
      time: '昨天 8:45:01',
      extra:
        'http://lc-KyqgG0La.cn-n1.lcfile.com/SVpXxMWQ2S5t07iBR4mInNWevU8zdn5C/flex.webp',
    },
    {
      id: 6,
      title: '小鱼',
      browse: '203',
      comment: '3',
      avatar:
        'http://lc-KyqgG0La.cn-n1.lcfile.com/0SNplirEV8GUtaTTTsClE8B9i7KTRL42/WechatIMG75.jpg',
      content: '提交了bug',
      link: '任务重启失败',
      time: '昨天 15:20:56',
    },
  ];
};

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/dashboard/project/list'), () => {
      return successResponseWrap(getProjectTrendsList());
    });
  },
});
