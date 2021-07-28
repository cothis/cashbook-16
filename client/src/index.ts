import MainView from './view/pages/main';

const $app = <HTMLElement>document.querySelector('#App');

const mainView = new MainView($app);
mainView.render();
