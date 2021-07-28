import Page from '@/view/pages/page';

export default class Router {
  history: Page[];
  map: Map<string, Page>;

  constructor() {
    this.history = [];
    this.map = new Map();

    this.registerCustomEventListener();
    this.registerPopstateEventListener();
  }

  registerPopstateEventListener() {
    window.addEventListener('popstate', (e: Event) => {
      const prevPage = this.history.pop();
      if (prevPage) {
        prevPage.$root.innerHTML = '';
      }

      const lastPage = this.history[this.history.length - 1];
      if (lastPage) {
        lastPage.render();
      }
    });
  }

  registerCustomEventListener() {
    window.addEventListener('route', (e: CustomEventInit) => {
      const pathname = e.detail.pathname;
      if (this.isBack(pathname)) {
        window.history.back();
        return;
      }

      this.route(pathname);
    });
  }

  private isBack(pathname: string) {
    return pathname === '@back';
  }

  addRoutePath(pathname: string, page: Page) {
    this.map.set(pathname, page);
  }

  route(pathname: string) {
    const page = this.map.get(pathname);
    if (!page) throw new Error('Route 페이지가 등록되지 않았습니다.');

    const lastPage = this.history[this.history.length - 1];
    if (lastPage) {
      lastPage.$root.innerHTML = '';
    }

    window.history.pushState({}, 'view', pathname);
    this.history.push(page);
    page.render();
  }
}
