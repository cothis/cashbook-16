import Page from '@/view/pages/page';
import html from '@/core/jsx';

export default class LoginPage extends Page {
  constructor(root: HTMLElement) {
    super(root);
  }

  createDom(): HTMLElement {
    return html`<div>
      로그인 화면입니다.
      <div>첫번째 블록입니다.</div>
      <a href="api/auth/github">github login</a>
      <router-link to="main">메인으로</router-link>
    </div>`;
  }
}
