import html from '../../core/jsx';
import View from '../view';
import { PaymentHistory } from '../../types/index';
import HistoryController from '../../controller/history';
import { HistoryState } from '../../store/history';
import { dateToString } from '../../utils';
import { getHistories } from '@/api/histories';

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

const THIS_CLASS = 'w-full md:w-3/4 flex flex-col sm:gap-24 gap-12 pb-12';

export default class HistoryList extends HTMLElement implements View {
  historyBoard: HistoryBoard[];

  constructor() {
    super();

    this.className = THIS_CLASS;
    this.historyBoard = [];
    getHistories().then((histories) => {
      HistoryController.setHistories(histories);
      HistoryController.subscribe(
        this,
        this.toHistoryBoardFromStore,
        'history'
      );
      this.toHistoryBoardFromStore();
    });
  }

  static define() {
    window.customElements.define('history-list', HistoryList);
  }

  toHistoryBoardFromStore = () => {
    const histories = HistoryController.getHistories() ?? [];

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
    this.historyBoard = Array.from(map).map((el) => el[1]);

    this.render();
  };

  createDom(): HTMLElement {
    return html`
      <div>
        ${this.historyBoard?.map(
          (day) => html`<section class="flex flex-col">
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
      </div>
    `;
  }

  render() {
    const dom = this.createDom();
    this.innerHTML = '';
    this.append(...dom.children);
  }
}
