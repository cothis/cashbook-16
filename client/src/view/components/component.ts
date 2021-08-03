import View from '@/view/view';

export default abstract class Component<P extends {} = {}, S extends {} = {}>
  implements View
{
  root?: HTMLElement;
  $this!: HTMLElement;
  state: S;
  props?: P;

  constructor(props?: P) {
    this.state = {} as S;
    this.props = props;
  }

  render() {
    this.$this = this.createDom();
  }

  abstract createDom(): HTMLElement;
}
