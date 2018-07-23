
import App from './App';
import Fillinfor from './components/Fillinfor';
import Subsuccess from './components/Subsuccess';
import Warning from './components/Warning';
import Index from './components/Index';
import Exchangelist from './components/Exchangelist';

const routes = {
    path: '/',
    component: App,
    IndexRoute: 'index',
    childRoutes: [
        { path: 'index', component: Index },
        { path: 'fillinfor', component: Fillinfor },// 收货地址
        { path: 'subsuccess', component: Subsuccess },// success
        { path: 'warning', component: Warning },// 没有中奖纪录
        { path: 'exchangelist', component: Exchangelist },// 中奖纪录
    ]
}
export default routes;