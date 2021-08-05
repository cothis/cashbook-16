import View from '../view';
import html from '../../core/jsx';
import HistoryController from '../../controller/history';
import { HistoryState } from '../../store/history';

const THIS_CLASS =
  'flex flex-row h-12 w-full justify-center text-sm text-black dark:text-white bg-gray-50 dark:bg-gray-700 sticky top-0';
const BUTTON_CLASS =
  'md:w-24 sm:w-20 w-16 h-full hover:text-green-400 dark:text-white';
const ACTIVE_CLASS = 'border-b-2 border-solid border-green-300';

export default class PayType extends HTMLElement implements View {
  isIncome?: HistoryState['isIncome'];

  constructor() {
    super();
    this.className = THIS_CLASS;
    this.render();
    HistoryController.subscribe(this, this.updateView, 'isIncome');
    this.setEvents();
  }

  setEvents = () => {
    this.addEventListener('click', (e: Event) => {
      const button = (<HTMLElement>e.target).closest('button');
      if (!button) return;

      const type = button.dataset.type;
      if (type !== undefined) {
        HistoryController.setSearchOption(type === 'income');
      } else {
        HistoryController.setSearchOption();
      }
    });
  };

  static define() {
    window.customElements.define('pay-type', PayType);
  }

  updateView = (isIncome: HistoryState['isIncome']) => {
    this.isIncome = isIncome;
    const dom = this.createDom();
    this.innerHTML = '';
    this.append(...dom.children);
  };

  createDom = (): HTMLElement => {
    return html`<div>
      <button
        class="${BUTTON_CLASS} ${this.isIncome === undefined
          ? ACTIVE_CLASS
          : ''}"
      >
        전체
      </button>
      <button
        data-type="income"
        class="${BUTTON_CLASS} ${this.isIncome ? ACTIVE_CLASS : ''}"
      >
        입금
      </button>
      <button
        data-type="spend"
        class="${BUTTON_CLASS} ${this.isIncome === false ? ACTIVE_CLASS : ''}"
      >
        출금
      </button>
    </div>`;
  };

  render = (): void => {
    const dom = this.createDom();
    this.innerHTML = '';
    this.append(...dom.children);
  };
}
