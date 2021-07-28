export default interface View {
  render(): void;
  createDom(): HTMLElement;
}
