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
