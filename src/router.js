
import App from './App';
import About from './components/About';
import Inbox from './components/Inbox';
import Index from './components/Index';

const routes = {
    path: '/',
    component: App,
    IndexRoute: 'index',
    childRoutes: [
        { path: 'index', component: Index },
        { path: 'about', component: About },
        { path: 'inbox', component: Inbox },
    ]
}
export default routes;