import Component from './Component';
import html from '../../core/jsx';
import CalendarController from '../../controller/calendar';
import HistoryController from '../../controller/history';
import {
  monthRangeFactory,
  timeStateToDate,
  toKRW,
  toMonthDateDay,
} from '../../utils';
import EditableRow, { EditableRowState } from './EditableRow';
import { getHistories } from '../../api/histories';
import { TimeState } from '@/store/time';

type CalendarModalState = {
  netPlus: number;
  netMinus: number;
  histories: {
    day: number;
    category: string;
    content: string;
    method: string;
    amount: number;
    uuid?: number;
  }[];
  time: TimeState;
};

class CalendarModal extends Component<{}, CalendarModalState> {
  $editableRows: EditableRow[];
  $lastRow: EditableRow;

  constructor() {
    super();
    this.state = {
      netPlus: 0,
      netMinus: 0,
      time: CalendarController.getCalendar(),
      histories: [],
    };
    this.$editableRows = [];
    this.$lastRow = new EditableRow({
      category: '미분류',
      amount: 0,
      content: '',
      method: '카드',
      onAddRow: this.onAddRow.bind(this),
    });
    this.$lastRow.render();

    CalendarController.subscribe(this, this.onTimeChange.bind(this), 'time');
  }

  onTimeChange = async (timeState: TimeState) => {
    this.state.time = timeState;
    const d = timeStateToDate(this.state.time);
    const histories = HistoryController.getHistoryOfDate(d);
    this.state.histories = histories.map((history) => {
      const { amount, payDate, content, method, category, uuid } = history;
      return {
        amount: parseInt(amount),
        day: payDate.getDate(),
        content,
        method: method.name,
        category: category.name,
        uuid,
      };
    });
    this.state.netPlus = histories.reduce((acc, history) => {
      if (parseInt(history.amount) > 0) return acc + parseInt(history.amount);
      return acc;
    }, 0);
    this.state.netMinus = histories.reduce((acc, history) => {
      if (parseInt(history.amount) < 0) return acc + parseInt(history.amount);
      return acc;
    }, 0);
    this.$editableRows = this.state.histories.map((history) => {
      const $newRow = new EditableRow({
        ...history,
        onDeleteRow: this.onDeleteRow.bind(this),
      });
      $newRow.render();
      return $newRow;
    });
    console.log(this.state.histories);
    this.render();
  };

  onAddRow = (rowInfo: EditableRowState) => {
    this.state.histories.push({
      day: this.state.time.date,
      category: rowInfo.category,
      amount: rowInfo.amount,
      content: rowInfo.content,
      method: rowInfo.method,
    });
    const $newLastRow = new EditableRow({
      category: '미분류',
      amount: 0,
      content: '새로운 항목',
      method: '카드',
      onAddRow: this.onAddRow.bind(this),
    });
    $newLastRow.render();
    this.$lastRow = $newLastRow;
  };

  onDeleteRow = () => {};

  open = () => {
    this.$this?.classList.remove('hidden');
  };

  close = () => {
    this.$this?.classList.add('hidden');
  };

  createDom(): HTMLElement {
    console.log(`${this.state.time.month} ${this.state.time.date} n요일`);
    return html`
      <div id="modal" class="hidden modal-bg blur">
        <section
          class="
            modal
            flex flex-col
            items-center
            justify-center
            sm:w-4/5 sm:h-3/5
            overflow-y-auto
            dark:text-purple-100
          "
        >
          <article class="w-full md:w-3/4 flex flex-col pl-2 pr-2 box-border">
            <div class="flex flex-row w-full justify-between items-center">
              <h2 class="text-lg text-green-400 dark:text-green-300">
                ${toMonthDateDay(this.state.time)}
              </h2>
              <div>
                <span class="text-xs text-green-400 text-right font-thin">
                  ${toKRW(this.state.netPlus)}
                </span>
                <span class="text-xs text-red-400 text-right font-thin">
                  ${toKRW(this.state.netMinus)}</span
                >
              </div>
            </div>

            ${this.$editableRows.map(($row) => $row.$this)}
            ${this.$lastRow.$this}

            <div
              class="
                flex flex-row
                w-full
                items-center
                justify-end
                border-t border-solid border-black
                dark:border-white
              "
            >
              <input
                id="submit"
                type="submit"
                class="
                  text-md text-white
                  mt-6
                  rounded-md
                  bg-green-400
                  dark:bg-green-500
                  cursor-pointer
                  p-1
                  pl-3
                  pr-3
                "
                value="변경사항 적용"
              />
            </div>
          </article>
        </section>
      </div>
    `;
  }
}

export default CalendarModal;
