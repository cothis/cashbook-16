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
    if (!this.$this.parentElement) {
      this.$this = this.createDom();
    }
    this.$this.parentElement?.replaceChild(this.createDom(), this.$this);
  }

  abstract createDom(): HTMLElement;
}
