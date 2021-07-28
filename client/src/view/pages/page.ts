import View from '@/view/view';

export default abstract class Page implements View {
  $root: HTMLElement;
  $this!: HTMLElement;

  constructor($root: HTMLElement) {
    this.$root = $root;
  }

  render(): void {
    const $new = this.createDom();
    if (this.$root.firstElementChild) {
      this.$root.replaceChild($new, this.$this);
    } else {
      this.$root.appendChild($new);
    }
    this.$this = $new;
  }

  abstract createDom(): HTMLElement;
}
