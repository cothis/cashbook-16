import Page from '@/view/pages/page';

const BACK_METHOD = '@back';

export default class Router {
  default?: Page;
  history: Page[];
  map: Map<string, Page>;

  constructor() {
    this.history = [];
    this.map = new Map();
    this.registerEvents();
  }

  private registerEvents() {
    window.addEventListener('popstate', this.popstateEventHandler.bind(this));
    window.addEventListener('route', this.routeEventHandler.bind(this));
  }

  private popstateEventHandler(e: Event) {
    const prevPage = this.history.pop();
    this.detachPage(prevPage);

    this.getLastPage().render();
  }

  private routeEventHandler(e: CustomEventInit): void {
    const pathname = e.detail.pathname;
    if (this.isBack(pathname)) {
      window.history.back();
      return;
    }

    this.route(pathname);
  }

  private detachPage(page?: Page) {
    if (page) page.$root.innerHTML = '';
  }

  private getLastPage(): Page {
    return this.history[this.history.length - 1];
  }

  private isBack(pathname: string) {
    return pathname === BACK_METHOD;
  }

  setDefaultPage(page: Page) {
    this.default = page;
  }

  addRoutePath(pathname: string, page: Page) {
    this.map.set(pathname, page);
  }

  route(pathname: string) {
    let page = this.map.get(pathname);
    if (!page) {
      if (!this.default) throw new Error('routing할 페이지가 없습니다.');
      page = this.default;
    }

    this.detachPage(this.getLastPage());

    window.history.pushState({}, 'view', pathname);
    this.history.push(page);
    page.render();
  }
}
