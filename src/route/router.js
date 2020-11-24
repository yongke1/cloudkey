/**路由文件 */
const App = resolve => require(['../App'], resolve);
// main主页面
const main = r => require.ensure([], () => r(require('@views/main')), 'main');
// 登录页
const login = r => require.ensure([], () => r(require('@views/login/login')), 'login');

const loginkey = r => require.ensure([], () => r(require('@views/login/loginkey')), 'loginkey');
// 404页面
const notFound = r => require.ensure([], () => r(require('@views/404/notfound')), 'notfound');

const dashboard = r => require.ensure([], () => r(require('@views/dashboard/dashboard')), 'dashboard');
const Switch = r => require.ensure([], () => r(require('@views/monitor/switch')), 'cloudSwitch');
const show = r => require.ensure([], () => r(require('@views/test/show')), 'cloudSwitch');
const test = r => require.ensure([], () => r(require('@views/test/test')), 'test');
const alter = r => require.ensure([], () => r(require('@views/alter/alter')), 'alter');
const DataInsight = r => require.ensure([], () => r(require('@views/DataInsight/DataInsight')), 'DataInsight');
const network = r => require.ensure([], () => r(require('@views/Network/network')), 'network');
const Wireless = r => require.ensure([], () => r(require('@views/Wireless/Wireless')), 'Wireless');

const gateway = r => require.ensure([], () => r(require('@views/gateway/gateway')), 'gateway');

export default [{
  path: '/',
  component: App,
  children: [{
    path: '',
    redirect: 'login'
  },
  {
    path: 'login',
    component: login,
    name: 'login'
  },

  {
    path: 'loginkey',
    component: loginkey,
    name: 'loginkey'
  },

  {
    path: 'notFound',
    component: notFound,
    name: 'notFound'
  },
  {
    path: 'main',
    component: main,
    children: [
      {
        path: '',
        redirect: 'dashboard'
      },
      {
        path: 'dashboard',
        component: dashboard,
        name: 'dashboard',
      },
      {
        path: 'Switch',
        component: Switch,
        name: 'Switch',
      },
      {
        path: 'show',
        component: show,
        name: 'show',
      },
      {
        path: 'test',
        component: test,
        name: 'test',
      },
      {
        path: 'alter',
        component: alter,
        name: 'alter',
      },
      {
        path: 'DataInsight',
        component: DataInsight,
        name: 'DataInsight',
      },
      {
        path: 'network',
        component: network,
        name: 'network',
      },
      {
        path: 'Wireless',
        component: Wireless,
        name: 'Wireless',
      },
      {
        path: 'gateway',
        component: gateway,
        name: 'gateway',
      },
    ]
  }
  ]
}];