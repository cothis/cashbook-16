import Page from './page';
import html from '../../core/jsx';
import Banner from '../FC/Banner';
import MonthSummary from '../FC/MonthSummary';
import Calendar from '../components/Calendar';
import CalendarModal from '../components/CalendarModal';
import HistoryController from '../../controller/history';
import CalendarController from '../../controller/calendar';
import { TimeState } from '../../store/time';
import { $, monthRangeFactory } from '../../utils';
import { getHistoryPiece } from '@/DTO/history';
import { PaymentHistory } from '@/types';

const BODY_WRAPPER_CLASS = `flex flex-col h-screen w-full justify-start items-center box-border gap-12 pb-12`;

interface CalendarPageState {
  time: TimeState;
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
    this.state = {
      time: CalendarController.getCalendar(),
      days: [],
    };
    this.$calendarModal = new CalendarModal();
    this.$calendarModal.render();
    this.$calendar = new Calendar({
      openModal: this.$calendarModal.open,
    });
    this.$calendar.render();
    this.$monthSummary = MonthSummary({
      plus: this.state.totalIncome ?? 0,
      minus: this.state.totalSpend ?? 0,
    });
    HistoryController.subscribe(
      this,
      this.onHistoryChange.bind(this),
      'history'
    );
    CalendarController.subscribe(this, this.onTimeChange.bind(this), 'time');
    this.onTimeChange(this.state.time);
  }

  onTimeChange(time: TimeState) {
    console.log(time);
    this.state.time = time;
    const [startDate, endDate] = monthRangeFactory(
      this.state.time.year,
      this.state.time.month
    );
    HistoryController.fetchHistory({
      startDate,
      endDate,
    });
  }

  onHistoryChange(histories: PaymentHistory[]) {
    console.log(histories);
    this.$calendar.clearCells();
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

  onPrevMonth = () => {
    CalendarController.setCalendar({
      ...this.state.time,
      month: this.state.time.month - 1,
    });
  };

  onNextMonth = () => {
    CalendarController.setCalendar({
      ...this.state.time,
      month: this.state.time.month + 1,
    });
  };

  createDom(): HTMLElement {
    const { month } = this.state.time;
    return html` <section onClick=${this.onOuterClick}>
      ${Banner()} ${this.$calendarModal.$this}
      <app-header active="calendar"></app-header>
      <section class="${BODY_WRAPPER_CLASS}">
        <h1 class="mt-8 text-4xl font-sans text-gray-600 dark:text-purple-100">
          ${month} 월 내 역
        </h1>

        ${this.$monthSummary} ${this.$calendar.$this}

        <div
          class="hidden sm:block fixed top-1/2 left-0 p-8 w-10 slide-btn"
          onClick=${this.onPrevMonth.bind(this)}
        >
          <
        </div>
        <div
          class="hidden sm:block fixed top-1/2 right-0 p-8 w-10 slide-btn"
          onClick=${this.onNextMonth.bind(this)}
        >
          >
        </div>
      </section>
    </section>`;
  }
}
