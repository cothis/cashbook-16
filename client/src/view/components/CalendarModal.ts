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
import EditableRow from './EditableRow';
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

  constructor() {
    super();
    this.state = {
      netPlus: 0,
      netMinus: 0,
      time: CalendarController.getCalendar(),
      histories: [],
    };
    this.$editableRows = [];

    CalendarController.subscribe(this, this.onTimeChange.bind(this), 'time');
  }

  onTimeChange = async (timeState: TimeState) => {
    this.state.time = timeState;
    const [startDate, endDate] = monthRangeFactory(
      this.state.time.year,
      this.state.time.month
    );
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
        onAddRow: this.onAddRow.bind(this),
        onDeleteRow: this.onDeleteRow.bind(this),
      });
      $newRow.render();
      return $newRow;
    });
    console.log(this.state.histories);
    this.render();
  };

  onAddRow = () => {
    this.state.histories.push({
      day: this.state.time.date,
      category: '미분류',
      amount: 0,
      content: '새로운 항목',
      method: '카드',
    });
    const $newRow = new EditableRow({
      category: '미분류',
      amount: 0,
      content: '새로운 항목',
      method: '카드',
      onAddRow: this.onAddRow.bind(this),
      onDeleteRow: this.onDeleteRow.bind(this),
    });
    $newRow.render();
    this.$editableRows.push($newRow);
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
            <form
              class="flex flex-row w-full h-12 items-center justify-between"
              onsubmit="return false;"
            >
              <select
                id="category"
                name="category"
                class="w-28 dark:text-white"
              >
                <option value="문화/여가" class="w-28 truncate dark:text-white">
                  문화/여가
                </option>
                <option value="생활" class="w-28 truncate dark:text-white">
                  생활
                </option>
                <option value="의료/건강" class="w-28 truncate dark:text-white">
                  의료/건강
                </option>
                <option value="교통" class="w-28 truncate dark:text-white">
                  교통
                </option>
                <option value="식비" class="w-28 truncate dark:text-white">
                  식비
                </option>
                <option
                  value="미분류"
                  class="w-28 truncate dark:text-white"
                  selected
                >
                  미분류
                </option>
              </select>
              <input
                id="ioContent"
                class="w-56 truncate dark:text-white"
                placeholder="새로운 입/지출"
                autocomplete="off"
              />
              <select
                id="method"
                name="method"
                class="hidden sm:block w-40 truncate dark:text-white"
              >
                <option
                  value="카드"
                  class="hidden sm:block w-40 truncate dark:text-white"
                >
                  카드
                </option>
                <option
                  value="현금"
                  class="hidden sm:block w-40 truncate dark:text-white"
                  selected
                >
                  현금
                </option>
                <option
                  value="현대카드"
                  class="hidden sm:block w-40 truncate dark:text-white"
                >
                  현대카드
                </option>
              </select>
              <input
                type="number"
                class="w-24 truncate sm:right-0 dark:text-white text-right"
                placeholder="금액 (원)"
                autocomplete="off"
                title="형식: 숫자"
              />
              <button class="p-2 plus">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.701212 7.20121H5.79879V12.2988C5.79879 12.677 6.11394 13 6.5 13C6.88606 13 7.20909 12.677 7.20909 12.2988V7.20121H12.2988C12.677 7.20121 13 6.88606 13 6.5C13 6.11394 12.677 5.79091 12.2988 5.79091H7.20909V0.701212C7.20909 0.32303 6.88606 0 6.5 0C6.11394 0 5.79879 0.32303 5.79879 0.701212V5.79091H0.701212C0.32303 5.79091 0 6.11394 0 6.5C0 6.88606 0.32303 7.20121 0.701212 7.20121Z"
                    fill="#34D399"
                  />
                </svg>
              </button>
            </form>
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
