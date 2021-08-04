import Page from './page';
import html from '../../core/jsx';
import HistoryController from '../../controller/history';
import { getCategories, getHistories } from '../../api/apis';
import CategoryController from '../../controller/category';
import { PaymentCategory, PaymentHistory } from '../../types';
import { HistoryState } from '@/store/history';
import { dateToString } from '@/utils';

interface HistoryBoard {
  date: string;
  totalIncome: string;
  totalSpend: string;
  detail: {
    category: string;
    content: string;
    method: string;
    amount: string;
  }[];
}

const methods = [
  {
    name: '카드',
    selected: true,
  },
  {
    name: '현금',
    selected: false,
  },
  {
    name: '현대카드',
    selected: false,
  },
];

const BUTTON_CLASS =
  'md:w-24 sm:w-20 w-16 h-full hover:text-green-400 dark:text-white';
const ACTIVE_CLASS = 'border-b-2 border-solid border-green-300';

export default class ListPage extends Page {
  private histories?: HistoryBoard[];

  constructor(root: HTMLElement) {
    super(root);
  }

  async beforeMount() {
    const [histories, categoreis] = await Promise.all([
      getHistories(),
      getCategories(),
    ]);

    HistoryController.setHistories(histories);
    CategoryController.setCategories(categoreis);
    this.toHistoryBoard({ histories });
    HistoryController.subscribe(this, this.render, 'history');
  }

  toHistoryBoard(historyState: HistoryState) {
    const histories: PaymentHistory[] = historyState.histories;
    const map = new Map<string, HistoryBoard>();
    histories.forEach((history) => {
      const date = dateToString(history.payDate);
      let find = map.get(date);
      if (!find) {
        find = { date, totalIncome: '0', totalSpend: '0', detail: [] };
      }

      find = {
        ...find,
        ...(history.isIncome && {
          totalIncome: String(
            Number(find.totalIncome) + Number(history.amount)
          ),
        }),
        ...(!history.isIncome && {
          totalSpend: String(Number(find.totalSpend) + Number(history.amount)),
        }),
      };

      find.detail.push({
        category: history.category.name,
        amount: history.amount,
        content: history.content,
        method: history.method.name,
      });

      map.set(date, find);
    });
    this.histories = Array.from(map).map((el) => el[1]);
  }

  createDom(): HTMLElement {
    return html`<section>
      <section
        class="h-6 w-full text-md text-center text-green-400 dark:text-purple-400"
      >
        운영체제 다크모드에 맞춰서 테마가 변해요!
      </section>
      <app-header active="list"></app-header>
      <section
        class="flex flex-row h-12 w-full justify-center text-sm text-black dark:text-white bg-gray-50 dark:bg-gray-700 sticky top-0"
      >
        <button class="${BUTTON_CLASS} ${ACTIVE_CLASS}">전체</button>
        <button class="${BUTTON_CLASS}">입금</button>
        <button class="${BUTTON_CLASS}">출금</button>
      </section>
      <section
        class="m-auto max-w-screen-xl flex flex-col w-full justify-start items-center box-border sm:gap-24 gap-12 pb-12"
      >
        <h1 class="mt-8 text-4xl font-sans text-gray-600 dark:text-purple-100">
          7 월 내 역
        </h1>

        <form
          action="/api"
          method="post"
          class="w-full md:w-3/4 flex flex-col"
          onsubmit="return false;"
        >
          <h2 class="text-lg text-green-400 dark:text-green-300 mb-4">
            새 내역 추가
          </h2>
          <input
            id="date"
            type="date"
            class="w-full sm:w-36 truncate text-black dark:text-white mb-4"
            value="2021-08-01"
          />
          <div
            class="flex flex-col sm:flex-row w-full sm:h-12 gap-6 sm:gap-0 items-start sm:items-center pl-1 sm:pl-0 justify-between"
          >
            <category-select></category-select>

            <input
              id="ioContent"
              class="w-full sm:w-56 truncate dark:text-white"
              placeholder="입/지출 내용"
              autocomplete="off"
            />
            <select
              id="method"
              name="method"
              size="3"
              class="w-full sm:w-40 dark:text-white"
            >
              ${methods.map(
                (method) => html`<option
                  value=${method.name}
                  class="w-full sm:w-40 truncate dark:text-white"
                  ${method.selected ? 'selected' : ''}
                >
                  ${method.name}
                </option>`
              )}
            </select>
            <input
              type="number"
              class="w-full sm:w-32 truncate sm:right-0 dark:text-white sm:text-right"
              placeholder="금액 (원)"
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

        ${this.histories?.map(
          (day) => html`<section class="w-full md:w-3/4 flex flex-col">
            <list-title
              date="${day.date}"
              income="${day.totalIncome}"
              spend="${day.totalSpend}"
            ></list-title>
            ${day.detail.map(
              (el) =>
                html`<list-item
                  category="${el.category}"
                  content="${el.content}"
                  method="${el.method}"
                  amount="${el.amount}"
                ></list-item>`
            )}
          </section>`
        )}

        <div class="hidden sm:block fixed top-1/2 left-0 p-8 w-10 slide-btn">
          <
        </div>
        <div class="hidden sm:block fixed top-1/2 right-0 p-8 w-10 slide-btn">
          >
        </div>
      </section>
    </section>`;
  }
}
