import View from '../view';
import html from '../../core/jsx';
import { PaymentMethod } from '../../types';
import ListController from '../../controller/list';
import { MethodState } from '../../store/method';

export default class MethodSelect extends HTMLElement implements View {
  methods: PaymentMethod[] = [];

  constructor() {
    super();

    this.methods = ListController.getMethods() ?? [];
    this.render();
  }

  static define() {
    window.customElements.define('method-select', MethodSelect);
  }

  createDom = (): HTMLElement => {
    return html`<div>
      <select
        id="method"
        name="method"
        size="3"
        class="w-full sm:w-40 dark:text-white"
      >
        ${this.methods.map(
          (method, i) => html`<option
            value=${method.name}
            class="w-full sm:w-40 truncate dark:text-white"
            selected=${i === 0}
          >
            ${method.name}
          </option>`
        )}
      </select>
    </div>`;
  };

  render = (): void => {
    const dom = this.createDom();
    this.innerHTML = '';
    this.append(...dom.children);
  };
}
