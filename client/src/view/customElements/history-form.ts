import html from '../../core/jsx';
import View from '../view';
import { createHistory } from '../../api/apis';
import HistoryController from '../../controller/history';
import { dateToString } from '../../utils';

const THIS_CLASS = 'w-full md:w-3/4 flex flex-col mt-8';
const TODAY = dateToString(new Date());

export default class HistoryForm extends HTMLElement implements View {
  constructor() {
    super();
    this.className = THIS_CLASS;
    this.render();
  }

  static define() {
    window.customElements.define('history-form', HistoryForm);
  }

  onSubmit = (e: Event) => {
    const target = e.target as HTMLFormElement;
    const datas = Object.fromEntries(new FormData(target));

    createHistory(datas).then((result) => {
      HistoryController.registerNewHistory(result);
    });

    e.preventDefault();
  };

  createDom(): HTMLElement {
    return html`
      <div>
        <form
          action="/api"
          method="post"
          class="flex flex-col"
          onsubmit=${this.onSubmit}
        >
          <h2 class="text-lg text-green-400 dark:text-green-300 mb-4">
            새 내역 추가
          </h2>
          <input
            id="date"
            type="date"
            name="payDate"
            class="w-full sm:w-36 truncate text-black dark:text-white mb-4"
            value="${TODAY}"
          />
          <div
            class="flex flex-col sm:flex-row w-full sm:h-12 gap-6 sm:gap-0 items-start sm:items-center pl-1 sm:pl-0 justify-between"
          >
            <category-select></category-select>

            <input
              id="ioContent"
              name="content"
              class="w-full sm:w-56 truncate dark:text-white"
              placeholder="입/지출 내용"
              autocomplete="off"
            />
            <method-select></method-select>
            <input
              type="number"
              name="amount"
              class="w-full sm:w-32 truncate sm:right-0 dark:text-white sm:text-right"
              placeholder="-지출/+수입 (원)"
              autocomplete="off"
              title="형식: 숫자"
            />
          </div>
          <div class="flex flex-row w-full items-center justify-end">
            <input
              id="submit"
              type="submit"
              class="text-md text-white mt-6 rounded-md bg-green-400 dark:bg-green-500 cursor-pointer p-1 pl-3 pr-3"
              value="새 내역 추가"
            />
          </div>
        </form>
      </div>
    `;
  }

  render() {
    const dom = this.createDom();
    this.innerHTML = '';
    this.append(...dom.children);
  }
}
