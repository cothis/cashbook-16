import View from '@/view/view';

export default class Page implements View {
  $root: HTMLElement;
  $this: HTMLElement;

  constructor($root: HTMLElement) {
    this.$root = $root;
    this.$this = document.createElement('code');
  }

  async beforeMount() {}

  async render() {
    await this.beforeMount();
    const $new = this.createDom();
    if (this.$root.firstElementChild) {
      this.$root.replaceChild($new, this.$root.firstElementChild);
    } else {
      this.$root.appendChild($new);
    }
    this.$this = $new;
  }

  createDom(): HTMLElement {
    throw new Error('need to be implemented');
  }
}
