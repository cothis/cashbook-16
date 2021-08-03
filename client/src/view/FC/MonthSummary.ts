import FC, { html, FCPropTypes } from './FC';
import { toKRW } from '../../utils';

interface MonthSummaryPropTypes extends FCPropTypes {
  plus: number;
  minus: number;
}

const MonthSummary: FC<MonthSummaryPropTypes> = (prop) => {
  if (prop === undefined) prop = { plus: 0, minus: 0 };
  /**
   * TODO: 스트링으로 원화처리 해주기
   */
  const plus = prop.plus;
  const minus = prop.minus;
  return html`
    <div class="month-summary flex flex-row justify-end items-center">
      <div>
        <span class="text-xs text-green-400 text-right font-thin"
          >${toKRW(plus)}</span
        >
        <span class="text-xs text-red-400 text-right font-thin"
          >${toKRW(minus)}</span
        >
      </div>
    </div>
  `;
};

export default MonthSummary;
