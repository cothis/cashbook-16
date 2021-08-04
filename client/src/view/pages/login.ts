import Page from '@/view/pages/page';
import html from '@/core/jsx';
import HistoryController from '../../controller/history';
import CategoryController from '../../controller/category';

export default class LoginPage extends Page {
  constructor(root: HTMLElement) {
    super(root);
  }

  async fetchUser() {
    try {
      const response = await fetch('/api/user', {
        credentials: 'include',
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }

      const routeEvent = new CustomEvent('route', {
        detail: {
          pathname: 'list',
        },
      });

      window.dispatchEvent(routeEvent);
    } catch (err) {
      console.error(err);
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
