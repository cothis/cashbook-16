import Page from './page';
import Component from '../components/component';
import UserInfoComponent from '../components/userinfo.comp';
import html from '../../core/jsx';
import MainController from '../../controller/main';

export default class MainView extends Page {
  userInfoComponent: Component;

  constructor(root: HTMLElement) {
    super(root);

    this.userInfoComponent = new UserInfoComponent();
    this.userInfoComponent.render();
  }

  onInput(e: Event) {
    const value: string = (<HTMLInputElement>e.target).value;
    console.log(value);
    MainController.requestSetUser({ id: value });
  }

  onInputName(e: Event) {
    const value: string = (<HTMLInputElement>e.target).value;
    console.log(value);
    MainController.requestSetUser({ name: value });
  }

  createDom(): HTMLElement {
    return html`<div>
      메인화면입니다.
      <div>첫번째 블록입니다.</div>
      <div>두번째 블록입니다.</div>
      <div>
        <label>
          <span>유저 아이디</span>
          <input type="text" onInput=${this.onInput} />
        </label>
        <label>
          <span>유저 이름</span>
          <input type="text" onInput=${this.onInputName} />
        </label>
      </div>
      ${this.userInfoComponent.$this}
    </div>`;
  }
}
