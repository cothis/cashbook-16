import Component from './component';
import html from '../../core/jsx';

class Calendar extends Component {
  state: {};
  constructor() {
    super();
    this.state = {};
  }

  createDom(): HTMLElement {
    return html`
      <section class="calendar">
        <div class="calendar-grid w-full h-full grid grid-cols-7 grid-rows-6">
          <span class="calendar-cell invisible"> </span>
          <span class="calendar-cell invisible"> </span>
          <calendar-cell day="1" plus="3,000" minus="12,000"></calendar-cell>
          <calendar-cell day="2"></calendar-cell>

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
    `;
  }
}

export default Calendar;
