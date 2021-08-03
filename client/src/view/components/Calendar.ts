import Component from './Component';
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

type CalendarProps = {
  openModal: () => void;
};

class Calendar extends Component<CalendarProps, {}> {
  state: CalendarState;

  constructor(props: CalendarProps) {
    super(props);
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
