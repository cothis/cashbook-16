import Page from '@/view/pages/page';
import html from '@/core/jsx';

export default class LoginPage extends Page {
  constructor(root: HTMLElement) {
    super(root);
  }

  async fetchUser() {
    const githubId = await fetch('/api/user', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => res.githubId);
    if (githubId !== 'not-logged-in') {
      const routeEvent = new CustomEvent('route', {
        detail: {
          pathname: 'main',
        },
      });

      window.dispatchEvent(routeEvent);
    }
  }

  createDom(): HTMLElement {
    this.fetchUser();
    return html`<div>
      <a href="/api/githublogin">깃허브 로그인</a>
      <router-link to="main">메인으로</router-link>
    </div>`;
  }
}
