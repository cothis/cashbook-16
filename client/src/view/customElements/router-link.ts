export default class RouterLink extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', this.onClick);
  }

  onClick() {
    const routeEvent = new CustomEvent('route', {
      detail: {
        pathname: this.getAttribute('to'),
      },
    });

    window.dispatchEvent(routeEvent);
  }
}
