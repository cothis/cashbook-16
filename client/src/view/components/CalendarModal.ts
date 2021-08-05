import Component from './Component';
import html from '../../core/jsx';
import CalendarController from '../../controller/calendar';
import HistoryController from '../../controller/history';
import {
  timeStateToString,
  timeStateToDate,
  toKRW,
  toMonthDateDay,
  monthRangeFactory,
} from '../../utils';
import EditableRow, { EditableRowState } from './EditableRow';
import { postHistories } from '../../api/apis';
import { TimeState } from '@/store/time';
import { categoryPostForm } from '@/DTO/category';
import { PaymentHistory } from '@/types';

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
    HistoryController.subscribe(
      this,
      this.onHistoryChange.bind(this),
      'history'
    );
  }

  onHistoryChange = async (histories: PaymentHistory[]) => {
    this.updateModalChilds();
  };

  onTimeChange = async (timeState: TimeState) => {
    this.state.time = timeState;
    this.updateModalChilds.call(this);
  };

  updateModalChilds = () => {
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
    this.state.netPlus = this.state.histories.reduce((acc, history) => {
      if (history.amount > 0) return acc + history.amount;
      return acc;
    }, 0);
    this.state.netMinus = this.state.histories.reduce((acc, history) => {
      if (history.amount < 0) return acc + history.amount;
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
    this.render();
  };

  onDeleteRow = (rowInfo: EditableRowState) => {
    this.state.histories = this.state.histories.filter((history) => {
      if (history.content === rowInfo.content) return false;
      return true;
    });
    this.$editableRows = this.$editableRows.filter(($row) => {
      if ($row.props?.content === rowInfo.content) return false;
      return true;
    });
    this.render();
  };

  onAddRow = (rowInfo: EditableRowState) => {
    console.log(rowInfo);
    this.state.histories.push({
      day: this.state.time.date,
      category: rowInfo.category,
      amount: rowInfo.amount,
      content: rowInfo.content,
      method: rowInfo.method,
    });
    const $prevLastRow = new EditableRow({
      category: rowInfo.category,
      amount: rowInfo.amount,
      content: rowInfo.content,
      method: rowInfo.method,
      onDeleteRow: this.onDeleteRow.bind(this),
    });
    $prevLastRow.render();
    this.$editableRows.push($prevLastRow);
    const $newLastRow = new EditableRow({
      category: '미분류',
      amount: 0,
      content: '',
      method: '카드',
      onAddRow: this.onAddRow.bind(this),
    });
    $newLastRow.render();
    this.$lastRow = $newLastRow;
    this.render();
  };

  open = () => {
    this.$this?.classList.remove('hidden');
  };

  close = () => {
    this.$this?.classList.add('hidden');
  };

  onSubmit = async () => {
    const $forms = this.$this?.querySelectorAll('form');
    if (!$forms) return;
    const forms = Array.from($forms);
    const datas = forms.reduce((acc: categoryPostForm[], form) => {
      const uuidString = (form.querySelector('#uuid') as HTMLInputElement)
        .value;
      const uuid = uuidString === '' ? undefined : parseInt(uuidString);
      const category = (form.querySelector('#category') as HTMLSelectElement)
        .value;
      const content = (form.querySelector('#ioContent') as HTMLInputElement)
        .value;
      const method = (form.querySelector('#method') as HTMLSelectElement).value;
      const amount = (form.querySelector('#amount') as HTMLInputElement).value;
      if (content === '' || Number(amount) === 0) return acc;
      acc.push({
        uuid,
        categoryName: category,
        content,
        methodName: method,
        isIncome: Number(amount) >= 0,
        amount: Number(amount),
        payDate: timeStateToString(this.state.time),
      });
      return acc;
    }, []);
    await postHistories({
      payDate: timeStateToString(this.state.time),
      datas,
    });
    const [startDate, endDate] = monthRangeFactory(
      this.state.time.year,
      this.state.time.month
    );
    await HistoryController.fetchHistory({
      startDate,
      endDate,
    });
    CalendarController.setCalendar(this.state.time);
    this.render();
  };

  createDom(): HTMLElement {
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
                onClick=${this.onSubmit.bind(this)}
              />
            </div>
          </article>
        </section>
      </div>
    `;
  }
}

export default CalendarModal;
