import Page from '@/view/pages/page';
import html from '@/core/jsx';

export default class LoginPage extends Page {
  constructor(root: HTMLElement) {
    super(root);
  }

  createDom(): HTMLElement {
    return html`<div>
      로그인 화면입니다.
      <button
        onClick=${() => {
          fetch('http://localhost:3000/api/githublogin', {
            credentials: 'include',
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res.redirect);
              window.location.href = res.redirect;
            });
        }}
      >
        깃허브 요청
      </button>
      <router-link to="main">메인으로</router-link>
    </div>`;
  }
}
