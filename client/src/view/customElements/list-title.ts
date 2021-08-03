import View from '../view';
import html from '../../core/jsx';

interface State {
  date: string;
  income?: string;
  spend?: string;

  [key: string]: string | undefined;
}

const LIST_TITLE_CLASS = 'flex flex-row w-full justify-between items-center';
const INCOME_TEXT_CLASS = 'text-xs text-green-400 text-right font-thin';
const SPEND_TEXT_CLASS = 'text-xs text-red-400 text-right font-thin';

export default class ListTitle extends HTMLElement implements View {
  state: State;

  constructor() {
    super();

    this.state = { date: '' };
    this.className = LIST_TITLE_CLASS;
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.state[name] = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ['date', 'income', 'spend'];
  }

  static define() {
    window.customElements.define('list-title', ListTitle);
  }

  createDom(): HTMLElement {
    const array = new Array();
    if (this.state.income && Number(this.state.income)) {
      array.push({
        amount: this.state.income + '원',
        class: INCOME_TEXT_CLASS,
      });
    }
    if (this.state.spend && Number(this.state.spend)) {
      array.push({
        amount: this.state.spend + '원',
        class: SPEND_TEXT_CLASS,
      });
    }

    const amounts =
      html`<div>
        ${array.map((el) => html`<span class=${el.class}>${el.amount}</span>`)}
      </div>` ?? '';

    return html`
      <div>
        <h2 class="text-lg text-green-400 dark:text-green-300">
          ${this.state.date}
        </h2>
        ${amounts}
      </div>
    `;
  }

  render(): void {
    const dom = this.createDom();
    this.innerHTML = '';
    this.append(...dom.children);
  }
}
