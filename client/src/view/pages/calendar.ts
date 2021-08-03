import Page from './page';
import html from '../../core/jsx';
import Banner from '../FC/Banner';
import MonthSummary from '../FC/MonthSummary';
import Calendar from '../components/Calendar';
import Component from '../components/component';

const BUTTON_CLASS = `md:w-24 sm:w-20 w-16 h-full hover:text-green-400 dark:text-white`;
const ACTIVE_CLASS = 'border-b-2 border-solid border-green-300';
const BODY_WRAPPER_CLASS = `flex flex-col h-screen w-full justify-start items-center box-border gap-12 pb-12`;

export default class CalendarPage extends Page {
  $calendar: Component;

  constructor(root: HTMLElement) {
    super(root);
    this.$calendar = new Calendar();
    this.$calendar.render();
  }

  createDom(): HTMLElement {
    return html` <section>
      ${Banner()}
      <app-header active="calendar"></app-header>
      <section
        class="flex flex-row h-12 w-full justify-center text-sm text-black dark:text-white bg-gray-50 dark:bg-gray-700 sticky top-0"
      >
        <button class="${BUTTON_CLASS} ${ACTIVE_CLASS}">전체</button>
        <button class="${BUTTON_CLASS}">입금</button>
        <button class="${BUTTON_CLASS}">출금</button>
      </section>
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
