import Router from '@/core/router';
import MainView from '@/view/pages/main';
import LoginPage from '@/view/pages/login';
import RouterLink from '@/view/customElements/router-link';
window.customElements.define('router-link', RouterLink);

const $app = <HTMLElement>document.querySelector('#App');
const router = new Router();

const mainView = new MainView($app);
const loginPage = new LoginPage($app);
router.addRoutePath('main', mainView);
router.addRoutePath('login', loginPage);
router.route('login');
