import Router from '@/core/router';
import MainView from '@/view/pages/main';
import LoginPage from '@/view/pages/login';
import ListPage from './view/pages/list';
import CalendarPage from './view/pages/Calendar';
import RouterLink from '@/view/customElements/router-link';
import ListTitle from './view/customElements/list-title';
import ListItem from './view/customElements/list-item';
import AppHeader from './view/customElements/app-header';
import CalendarCell from './view/customElements/calendar-cell';

import './view/styles/reset.css';
import './view/styles/index.css';
import './view/styles/navbar.css';
import './view/styles/calendar.css';
import './view/styles/calendar.tailwind.css';
import './view/styles/income.tailwind.css';
// import 'tailwindcss/tailwind.css';
window.customElements.define('router-link', RouterLink);
ListTitle.define();
ListItem.define();
AppHeader.define();
CalendarCell.define();

const router = new Router();

router.addRoutePath('main', MainView);
router.addRoutePath('login', LoginPage);
router.addRoutePath('list', ListPage);
router.addRoutePath('calendar', CalendarPage);
router.addRoutePath('', LoginPage);
router.setDefaultPage(new CalendarPage(document.body));
router.route(location.pathname.slice(1));
