import View from '../view';

export default abstract class Component implements View {
  root?: HTMLElement;
  $this!: HTMLElement;

  constructor() {}

  render() {
    this.$this = this.createDom();
  }

  abstract createDom(): HTMLElement;
}
