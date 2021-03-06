import html from '../../core/jsx';
import View from '../view';

const CALENDAR_CELL_CLASS = `calendar-cell pb-2`;
const CALENDAR_CELL_DATE = `absolute left-2 top-2 dark:text-purple-300`;
const CALENDAR_CELL_PLUS = `md:h-4 sm:h-3 h-2 hidden sm:block text-xs rounded-md text-right text-green-400 md:pr-3 pr-1`;
const CALENDAR_CELL_PLUS_DOT = `md:h-4 sm:h-3 h-2 block sm:hidden text-xs rounded-md text-right text-green-400 md:pr-3 pr-1`;
const CALENDAR_CELL_MINUS = `md:h-4 sm:h-3 h-2 hidden sm:block text-xs rounded-md text-right text-red-400 md:pr-3 pr-1`;
const CALENDAR_CELL_MINUS_DOT = `md:h-4 sm:h-3 h-2 block sm:hidden text-xs rounded-md text-right text-red-400 md:pr-3 pr-1`;

interface State {
  plus?: number;
  minus?: number;
  day: number;
}

export default class CalendarCell extends HTMLElement implements View {
  private state: State;

  constructor() {
    super();
    this.className = CALENDAR_CELL_CLASS;
    this.state = { day: 0 };
    this.render();
  }

  attributeChangedCallback(
    name: keyof State,
    oldValue: string,
    newValue: string
  ) {
    this.state[name] = parseInt(newValue);
    this.render();
  }

  static get observedAttributes() {
    return ['plus', 'minus', 'day'];
  }

  static define() {
    window.customElements.define('calendar-cell', CalendarCell);
  }

  createDom(): HTMLElement {
    const { plus, minus, day } = this.state;
    return html`
      <span class="calendar-cell pb-2">
        <div class="calendar-cell__day ${CALENDAR_CELL_DATE}">${day}</div>
        ${plus
          ? [
              html`
                <div class="${CALENDAR_CELL_PLUS}">
                  ${plus.toLocaleString()}
                </div>
              `,
              html` <div class="${CALENDAR_CELL_PLUS_DOT}">。</div> `,
            ]
          : undefined}
        ${minus
          ? [
              html`
                <div class="${CALENDAR_CELL_MINUS}">
                  ${minus.toLocaleString()}
                </div>
              `,
              html` <div class="${CALENDAR_CELL_MINUS_DOT}">。</div> `,
            ]
          : undefined}
      </span>
    `;
  }

  render() {
    const dom = this.createDom();
    this.innerHTML = '';
    this.append(...dom.children);
  }
}
