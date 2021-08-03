import Component from './component';
import html from '../../core/jsx';
import { getRandomInt } from '../../utils';

type Cell = {
  day: number;
  plus: number;
  minus: number;
};

type CalendarState = {
  cells: Cell[];
};

class Calendar extends Component {
  state: CalendarState;
  constructor() {
    super();
    this.state = {
      cells: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15].map(
        (val, idx, arr) => ({
          day: val,
          minus: getRandomInt(-20000, 0),
          plus: getRandomInt(0, 20000),
        })
      ),
    };
  }

  createDom(): HTMLElement {
    const { cells } = this.state;
    console.log(cells);

    return html`
      <section class="calendar">
        <div class="calendar-grid w-full h-full grid grid-cols-7 grid-rows-6">
          <span class="calendar-cell invisible"> </span>
          <span class="calendar-cell invisible"> </span>

          ${cells.map((cell) => {
            return html`
              <calendar-cell
                day="${cell.day}"
                plus="${cell.plus}"
                minus="${cell.minus}"
              >
              </calendar-cell>
            `;
          })}
        </div>
      </section>
    `;
  }
}

export default Calendar;
