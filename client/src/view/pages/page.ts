import html from '@/core/jsx';
import View from '@/view/view';

export default class Page implements View {
  $root: HTMLElement;
  $this: HTMLElement;

  constructor($root: HTMLElement) {
    this.$root = $root;
    this.$this = document.createElement('code');
  }

  async render() {
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
