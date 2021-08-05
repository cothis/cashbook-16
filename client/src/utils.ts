import { TimeState } from '@/store/time';
const { stringify } = JSON;

/**
 * 이전 상태와 바뀔 상태를 비교합니다.
 * @returns 같으면 true, 다르면 false
 */
export const cmpState = (prevState: {}, nextState: {}): boolean => {
  return stringify(prevState) === stringify(nextState);
};

/**
 * @param price
 * @returns 금액을 'OOO, OOO원' 포맷으로 변경해서 리턴
 */
export const toKRW = (price: number): string => {
  return price.toLocaleString() + '원';
};

/**
 * @param min 시작값 보다 크고
 * @param max 끝값 보다 작을것
 * @returns min과 max사이의 랜덤정수
 */
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
};

export const $ = (selector: string): HTMLElement | null =>
  document.querySelector(selector);

export const debouncer = <T>() => {
  let timer: NodeJS.Timeout | undefined = undefined;
  return (
    callback: Function,
    timeout: number = 0,
    ...params: any[]
  ): Promise<T> => {
    if (timer) clearTimeout(timer);
    return new Promise<T>((resolve) => {
      timer = setTimeout(() => {
        resolve(callback(...params));
      }, timeout);
    });
  };
};

export const dateToString = (date: Date | string, splitter: string = '-') => {
  if (typeof date === 'string') {
    try {
      date = new Date(date);
    } catch (e) {
      throw new Error(`${date}는 날짜로 변환할수 없습니다.`);
    }
  }

  const year = date.getFullYear();
  let month = String(date.getMonth() + 1);
  month = Number(month) < 10 ? '0' + month : month;
  let day = String(date.getDate());
  day = Number(day) < 10 ? '0' + day : day;
  return year + splitter + month + splitter + day;
};

/**
 *
 * @returns [해당달의 처음 Date, 다음달의 처음 Date]
 */
export const monthRangeFactory = (year: number, month: number) => {
  const start = new Date(
    `${year}-${String(month).padStart(2, '0')}-01T00:00:00`
  );
  const end = new Date(
    `${year}-${String(month + 1).padStart(2, '0')}-01T00:00:00Z`
  );

  return [start, end];
};

/**
 * @param timeState
 * @returns 7월 8일 목 이런식으로 리턴함
 */
export const toMonthDateDay = (timeState: TimeState) => {
  const { year, month, date } = timeState;
  const d = new Date(
    `${timeState.year}-${String(month).padStart(2, '0')}-${String(
      date
    ).padStart(2, '0')}T00:00:00Z`
  );
  const day = d.getDay();
  const dow = '일월화수목금토'[day];

  return `${month}월 ${date}일 ${dow}`;
};

/**
 * @returns Date 객체 반환
 */
export const timeStateToDate = (timeState: TimeState) => {
  const d = new Date(
    `${timeState.year}-${String(timeState.month).padStart(2, '0')}-${String(
      timeState.date
    ).padStart(2, '0')}T00:00:00Z`
  );

  return d;
export const urlencodeFormData = (fd: FormData) => {
  const params = new URLSearchParams();
  for (const pair of fd.entries()) {
    typeof pair[1] == 'string' && params.append(pair[0], pair[1]);
  }
  return params.toString();
};
