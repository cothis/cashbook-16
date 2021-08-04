import Page from './page';
import html from '../../core/jsx';
import Banner from '../FC/Banner';
import MonthSummary from '../FC/MonthSummary';
import Calendar from '../components/Calendar';
import CalendarModal from '../components/CalendarModal';
import HistoryController from '../../controller/history';
import { getHistories } from '../../api/histories';
import { $, monthRangeFactory } from '../../utils';
import { getHistoryPiece } from '@/DTO/history';
import { HistoryState } from '@/store/history';

const BUTTON_CLASS = `md:w-24 sm:w-20 w-16 h-full hover:text-green-400 dark:text-white`;
const ACTIVE_CLASS = 'border-b-2 border-solid border-green-300';
const BODY_WRAPPER_CLASS = `flex flex-col h-screen w-full justify-start items-center box-border gap-12 pb-12`;

interface CalendarPageState {
  year: number;
  month: number;
  totalIncome?: number;
  totalSpend?: number;
  days: getHistoryPiece[];
}
export default class CalendarPage extends Page {
  $calendar: Calendar;
  $calendarModal: CalendarModal;
  $monthSummary: HTMLElement;
  state: CalendarPageState;

  constructor(root: HTMLElement) {
    super(root);
    this.$calendarModal = new CalendarModal();
    this.$calendarModal.render();
    this.$calendar = new Calendar({
      openModal: this.$calendarModal.open,
    });
    this.$calendar.render();
    this.state = { year: 2021, month: 7, days: [] };
    this.$monthSummary = MonthSummary({
      plus: this.state.totalIncome ?? 0,
      minus: this.state.totalSpend ?? 0,
    });
    HistoryController.subscribe(this, this.onMount.bind(this), 'history');
    const [startDate, endDate] = monthRangeFactory(
      this.state.year,
      this.state.month
    );
    HistoryController.fetchHistory({
      startDate,
      endDate,
    });
  }

  onMount(historyState: HistoryState) {
    const histories = historyState.histories;

    histories.forEach((historyPiece) => {
      const date = historyPiece.payDate.getDate() - 1;
      if (historyPiece.isIncome) {
        this.$calendar.state.cells[date].plus += parseInt(historyPiece.amount);
      } else {
        this.$calendar.state.cells[date].minus += parseInt(historyPiece.amount);
      }
    });
    this.state.totalIncome = histories.reduce((acc, val) => {
      const amount = parseInt(val.amount);
      if (amount > 0) return acc + amount;
      return acc;
    }, 0);
    this.state.totalSpend = histories.reduce((acc, val) => {
      const amount = parseInt(val.amount);
      if (amount < 0) return acc + amount;
      return acc;
    }, 0);
    this.$calendar.render();
    this.$monthSummary = MonthSummary({
      plus: this.state.totalIncome ?? 0,
      minus: this.state.totalSpend ?? 0,
    });
    this.render();
  }

  onOuterClick = (ev: Event) => {
    if (ev.target === $('.modal-bg')) {
      this.$calendarModal.close();
    }
  };

  createDom(): HTMLElement {
    const { month, year } = this.state;
    return html` <section onClick=${this.onOuterClick}>
      ${Banner()} ${this.$calendarModal.$this}
      <app-header active="calendar"></app-header>
      <section class="${BODY_WRAPPER_CLASS}">
        <h1 class="mt-8 text-4xl font-sans text-gray-600 dark:text-purple-100">
          ${month} 월 내 역
        </h1>

        ${this.$monthSummary} ${this.$calendar.$this}

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
