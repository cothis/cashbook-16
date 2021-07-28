import MainView from './view/main';

const $app = <HTMLElement>document.querySelector('#App');

const mainView = new MainView($app);
mainView.render();
