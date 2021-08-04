import Component from './Component';
import html from '../../core/jsx';
import CalendarController from '../../controller/calendar';
import { $ } from '../../utils';

interface Cell {
  day: number;
  plus: number;
  minus: number;
}

interface CalendarState {
  cells: Cell[];
}

class Calendar extends Component {
  state: CalendarState;

  constructor() {
    super();
    this.state = { cells: [] };
    this.clearCells();
  }

  clearCells = () => {
    this.state = {
      cells: [...Array(30).keys()].map((val) => ({
        day: val + 1,
        minus: 0,
        plus: 0,
      })),
    };
  };

  createDom(): HTMLElement {
    const { cells } = this.state;

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
                onClick=${() => {
                  const time = CalendarController.getCalendar();
                  CalendarController.setCalendar({
                    ...time,
                    date: cell.day,
                  });
                  $('.modal-bg')?.classList.remove('hidden');
                }}
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
