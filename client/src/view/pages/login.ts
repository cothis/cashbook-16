import Page from '@/view/pages/page';
import html from '@/core/jsx';

export default class LoginPage extends Page {
  constructor(root: HTMLElement) {
    super(root);
  }

  fetchUser() {
    fetch('http://localhost:3000/api/user', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(console.log);
  }

  createDom(): HTMLElement {
    this.fetchUser();
    return html`<div>
      로그인 화면입니다.
      <a href="/api/githublogin">깃허브 요청</a>
      <router-link to="main">메인으로</router-link>
    </div>`;
  }
}
