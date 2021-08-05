import Page from '@/view/pages/page';
import html from '@/core/jsx';

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
          pathname: 'calendar',
        },
      });

      window.dispatchEvent(routeEvent);
    } catch (err) {
      console.error(err);
    }
  }

  createDom(): HTMLElement {
    this.fetchUser();
    return html`<div
      class="flex flex-column h-full w-full items-center justify-center"
    >
      <a href="/api/githublogin">
        <img
          src="https://user-images.githubusercontent.com/13645032/126734049-a98f0f5f-74df-4c9f-b302-88163bbf96b5.png"
        />
        <div class="text-center">사진을 눌러서 깃허브 로그인 하세요</div>
      </a>
    </div>`;
  }
}
