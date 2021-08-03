const { stringify } = JSON;

/**
 * 이전 상태와 바뀔 상태를 비교합니다.
 * @returns 같으면 true, 다르면 false
 */
export const cmpState = (prevState: {}, nextState: {}): boolean => {
  return stringify(prevState) === stringify(nextState);
};

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
