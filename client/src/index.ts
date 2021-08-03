import Router from '@/core/router';
import MainView from '@/view/pages/main';
import LoginPage from '@/view/pages/login';
import ListPage from './view/pages/list';
import RouterLink from '@/view/customElements/router-link';
import ListTitle from './view/customElements/list-title';
import ListItem from './view/customElements/list-item';
import AppHeader from './view/customElements/app-header';
import './view/styles/reset.css';
import './view/styles/index.css';
import 'tailwindcss/tailwind.css';
window.customElements.define('router-link', RouterLink);
ListTitle.define();
ListItem.define();
AppHeader.define();

const $app = <HTMLElement>document.querySelector('#App');
const router = new Router();

const mainView = new MainView($app);
const loginPage = new LoginPage($app);
const listPage = new ListPage($app);
router.addRoutePath('main', mainView);
router.addRoutePath('login', loginPage);
router.addRoutePath('list', listPage);
router.route('list');
