import Page from './page';
import html from '../../core/jsx';
import Banner from '../FC/Banner';
import MonthSummary from '../FC/MonthSummary';

const BUTTON_CLASS =
  'md:w-24 sm:w-20 w-16 h-full hover:text-green-400 dark:text-white';
const ACTIVE_CLASS = 'border-b-2 border-solid border-green-300';
const BODY_WRAPPER_CLASS = `flex flex-col h-screen w-full justify-start items-center box-border gap-12 pb-12`;

export default class CalendarPage extends Page {
  constructor(root: HTMLElement) {
    super(root);
  }

  createDom(): HTMLElement {
    return html` <section id="app" class="dark:bg-gray-800">
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

        ${MonthSummary({ plus: 12000, minus: 56240 })}

        <section class="calendar">
          <div class="calendar-grid w-full h-full grid grid-cols-7 grid-rows-6">
            <span class="calendar-cell invisible"> </span>
            <span class="calendar-cell invisible"> </span>
            <span class="calendar-cell pb-2">
              <div class="absolute left-2 top-2 dark:text-purple-300">1</div>
              <div
                class="
                  md:h-4
                  sm:h-3
                  h-2
                  hidden
                  sm:block
                  text-xs
                  rounded-md
                  text-right text-green-400
                  md:pr-3
                  pr-1
                "
              >
                +3000
              </div>
              <div
                class="
                  md:h-4
                  sm:h-3
                  h-2
                  block
                  sm:hidden
                  text-xs
                  rounded-md
                  text-right text-green-400
                  md:pr-3
                  pr-1
                "
              >
                。
              </div>
              <div
                class="
                  md:h-4
                  sm:h-3
                  h-2
                  hidden
                  sm:block
                  text-xs
                  rounded-md
                  text-right text-red-400
                  md:pr-3
                  pr-1
                "
              >
                -12,000
              </div>
              <div
                class="
                  md:h-4
                  sm:h-3
                  h-2
                  block
                  sm:hidden
                  text-xs
                  rounded-md
                  text-right text-red-400
                  md:pr-3
                  pr-1
                "
              >
                。
              </div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 dark:text-purple-300">2</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 dark:text-purple-300">3</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 dark:text-purple-300">4</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 text-blue-400">5</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 text-red-400">6</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 dark:text-purple-300">7</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 dark:text-purple-300">8</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 dark:text-purple-300">9</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 dark:text-purple-300">11</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 dark:text-purple-300">12</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 text-blue-400">13</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 text-red-400">14</div>
            </span>
            <span class="calendar-cell">
              <div class="absolute left-2 top-2 dark:text-purple-300">15</div>
            </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
            <span class="calendar-cell"> </span>
          </div>
        </section>

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
