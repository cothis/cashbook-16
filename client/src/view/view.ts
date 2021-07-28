export default abstract class View {
  root: HTMLElement;
  thisElement!: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  reRender(): void {
    const newElement = this.createDom();
    this.root.replaceChild(newElement, this.thisElement);
    this.thisElement = newElement;
  }

  render(): void {
    this.thisElement = this.createDom();
    this.root.appendChild(this.thisElement);
  }

  abstract createDom(): HTMLElement;
}
