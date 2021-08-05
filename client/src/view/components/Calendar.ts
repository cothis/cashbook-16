import Component from './Component';
import html from '../../core/jsx';
import CalendarController from '../../controller/calendar';
import { $, timeStateToFirstDayOfWeek } from '../../utils';
import { TimeState } from '../../store/time';

interface Cell {
  day: number;
  plus: number;
  minus: number;
}

interface CalendarState {
  cells: Cell[];
  offset: number;
  time: TimeState;
}

class Calendar extends Component<{}, CalendarState> {
  // state: CalendarState;

  constructor() {
    super();
    this.state = {
      cells: [],
      time: CalendarController.getCalendar(),
      offset: 2,
    };
    this.state.offset = timeStateToFirstDayOfWeek(this.state.time);
    CalendarController.subscribe(this, this.onTimeChange.bind(this), 'time');
    this.clearCells();
  }

  onTimeChange(time: TimeState) {
    this.state.time = time;
    this.state.offset = timeStateToFirstDayOfWeek(this.state.time);
    this.render();
  }

  clearCells = () => {
    this.state.cells = [...Array(30).keys()].map((val) => ({
      day: val + 1,
      minus: 0,
      plus: 0,
    }));
  };

  createDom(): HTMLElement {
    const { cells, offset } = this.state;

    return html`
      <section class="calendar">
        <div class="calendar-grid w-full h-full grid grid-cols-7 grid-rows-6">
          ${[...Array(offset)].map(() => {
            return html` <span class="calendar-cell invisible"> </span> `;
          })}
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
