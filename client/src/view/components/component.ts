import View from '@/view/view';

export default abstract class Component<P extends {} = {}, S extends {} = {}>
  implements View
{
  root?: HTMLElement;
  $this: HTMLElement;
  state: S;
  props?: P;

  constructor(props?: P) {
    this.state = {} as S;
    this.props = props;
    this.$this = document.createElement('code');
  }

  render() {
    this.$this = this.createDom();
    // this.$this.replaceWith(this.createDom());
  }

  abstract createDom(): HTMLElement;
}
