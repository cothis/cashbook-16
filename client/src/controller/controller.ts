import { BaseState } from '@/store/store';
import View from '../view/view';

export default abstract class Controller<S> {
  protected subscribers: Map<[string, View], Function>;

  constructor() {
    this.subscribers = new Map();
  }

  subscribe(view: View, cb: Function, key: keyof S) {
    this.subscribers.set([key as string, view], cb);
  }

  unsubscribe(view: View) {
    // this.subscribers.delete(view);
  }

  notify(key: keyof S): void {
    const newState = this.reduceFrom(key);

    this.subscribers.forEach((cb, [currentKey, view]) => {
      if (currentKey === key) cb.call(view, newState);
    });
  }

  abstract reduceFrom(key: keyof S): BaseState;
}
