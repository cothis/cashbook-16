import Router from '@/core/router';
import MainView from '@/view/pages/main';
import LoginPage from '@/view/pages/login';
import ListPage from './view/pages/list';
import CalendarPage from './view/pages/Calendar';

import './view/customElements';

import './view/styles/reset.css';
import './view/styles/index.css';
import './view/styles/navbar.css';
import './view/styles/calendar.css';
import './view/styles/calendar.tailwind.css';
import './view/styles/income.tailwind.css';
// import 'tailwindcss/tailwind.css';

const router = new Router();

router.addRoutePath('main', MainView);
router.addRoutePath('login', LoginPage);
router.addRoutePath('list', ListPage);
router.addRoutePath('calendar', CalendarPage);
router.addRoutePath('', LoginPage);
router.setDefaultPage(LoginPage);
router.route(location.pathname.slice(1));
