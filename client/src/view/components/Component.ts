import View from '../view';

export default abstract class Component<P extends {} = {}, S extends {} = {}>
  implements View
{
  root?: HTMLElement;
  $this?: HTMLElement;
  state: S;
  props?: P;

  constructor(props?: P) {
    this.state = {} as S;
    this.props = props;
    // this.$this = document.createElement('code');
  }

  render() {
    if (!this.$this) this.$this = this.createDom();
    else
      this.$this.firstElementChild?.replaceWith(
        this.createDom().firstElementChild!
      );
    // this.$this.replaceWith(this.createDom());
  }

  abstract createDom(): HTMLElement;
}
