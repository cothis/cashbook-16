import Component from './Component';
import html from '../../core/jsx';
import { getRandomInt } from '../../utils';

interface Cell {
  day: number;
  plus: number;
  minus: number;
}

interface CalendarState {
  cells: Cell[];
}

interface CalendarProps {
  openModal: () => void;
}

class Calendar extends Component<CalendarProps, {}> {
  state: CalendarState;

  constructor(props: CalendarProps) {
    super(props);
    this.state = {
      cells: [...Array(30).keys()].map((val, idx, arr) => ({
        day: val,
        minus: 0,
        plus: 0,
      })),
    };
  }

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
                  this.props?.openModal();
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
