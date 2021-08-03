import html from '../../core/jsx';
import View from '../view';

const LIST_ITEM_CLASS =
  'flex flex-row w-full h-12 items-center justify-between';
const DARK_TEXT_PURPLE_CLASS = 'truncate dark:text-purple-200';
const INCOME_CLASS = 'w-32 truncate right-0 text-green-400 text-right';
const SPEND_CLASS = 'w-32 truncate right-0 text-red-400 text-right';

interface State {
  category?: string;
  content?: string;
  method?: string;
  amount?: string;
  [index: string]: string | undefined;
}

export default class ListItem extends HTMLElement implements View {
  private state: State;
  private isIncome: boolean;

  constructor() {
    super();
    this.className = LIST_ITEM_CLASS;
    this.state = {};
    this.isIncome = false;
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.state[name] = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ['category', 'content', 'method', 'amount'];
  }

  static define() {
    window.customElements.define('list-item', ListItem);
  }

  createDom(): HTMLElement {
    const isIncome = Number(this.state.amount) > 0;
    const amountText = this.state.amount + '원';

    return html`
      <div>
        <span class="w-28 ${DARK_TEXT_PURPLE_CLASS}"
          >${this.state.category}</span
        >
        <span class="w-56 ${DARK_TEXT_PURPLE_CLASS}"
          >${this.state.content}</span
        >
        <span class="hidden sm:block w-40 ${DARK_TEXT_PURPLE_CLASS}"
          >${this.state.method}</span
        >
        <span class="${isIncome ? INCOME_CLASS : SPEND_CLASS}"
          >${amountText}</span
        >
      </div>
    `;
  }

  render() {
    const dom = this.createDom();
    this.innerHTML = '';
    this.append(...dom.children);
  }
}
