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
