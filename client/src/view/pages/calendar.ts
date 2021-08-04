import Page from './page';
import html from '../../core/jsx';
import Banner from '../FC/Banner';
import MonthSummary from '../FC/MonthSummary';
import Calendar from '../components/Calendar';
import CalendarModal from '../components/CalendarModal';
import Component from '../components/Component';
import { $ } from '../../utils';

const BUTTON_CLASS = `md:w-24 sm:w-20 w-16 h-full hover:text-green-400 dark:text-white`;
const ACTIVE_CLASS = 'border-b-2 border-solid border-green-300';
const BODY_WRAPPER_CLASS = `flex flex-col h-screen w-full justify-start items-center box-border gap-12 pb-12`;

export default class CalendarPage extends Page {
  $calendar: Component;
  $calendarModal: Component;

  constructor(root: HTMLElement) {
    super(root);
    this.$calendarModal = new CalendarModal();
    this.$calendarModal.render();
    this.$calendar = new Calendar({
      openModal: (this.$calendarModal as CalendarModal).open,
    });
    this.$calendar.render();
  }

  onOuterClick = (ev: Event) => {
    if (ev.target === $('.modal-bg')) {
      (this.$calendarModal as CalendarModal).close();
    }
  };

  createDom(): HTMLElement {
    return html` <section onClick=${this.onOuterClick}>
      ${Banner()} ${this.$calendarModal.$this}
      <app-header active="calendar"></app-header>
      <section class="${BODY_WRAPPER_CLASS}">
        <h1 class="mt-8 text-4xl font-sans text-gray-600 dark:text-purple-100">
          7 월 내 역
        </h1>

        ${MonthSummary({ plus: 12000, minus: 56240 })} ${this.$calendar.$this}

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
