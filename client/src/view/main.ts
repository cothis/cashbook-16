import View from './view';
import html from '../core/jsx';
import MainController from '../controller/main';

export default class MainView extends View {
  constructor(root: HTMLElement) {
    super(root);
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

  onMenuChange(e: Event) {
    const value: string = (<HTMLInputElement>e.target).value;
    MainController.requestSetMenu({ current: value });
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
      <div onChange=${this.onMenuChange}>
        <label>
          <span>menu1</span>
          <input type="radio" name="menu" value="menu1" />
        </label>
        <label>
          <span>menu2</span>
          <input type="radio" name="menu" value="menu2" />
        </label>
      </div>
    </div>`;
  }
}
