import Page from './page';
import html from '../../core/jsx';
import HistoryController from '../../controller/history';
import { getCategories, getHistories } from '../../api/apis';
import ListController from '../../controller/list';

const BUTTON_CLASS =
  'md:w-24 sm:w-20 w-16 h-full hover:text-green-400 dark:text-white';
const ACTIVE_CLASS = 'border-b-2 border-solid border-green-300';

export default class ListPage extends Page {
  constructor(root: HTMLElement) {
    super(root);
  }

  async beforeMount() {
    const [histories, categoreis] = await Promise.all([
      getHistories(),
      getCategories(),
    ]);

    HistoryController.setHistories(histories);
    ListController.setCategories(categoreis);
  }

  createDom(): HTMLElement {
    return html`<section>
      <section
        class="h-6 w-full text-md text-center text-green-400 dark:text-purple-400"
      >
        운영체제 다크모드에 맞춰서 테마가 변해요!
      </section>
      <app-header active="list"></app-header>
      <section
        class="flex flex-row h-12 w-full justify-center text-sm text-black dark:text-white bg-gray-50 dark:bg-gray-700 sticky top-0"
      >
        <button class="${BUTTON_CLASS} ${ACTIVE_CLASS}">전체</button>
        <button class="${BUTTON_CLASS}">입금</button>
        <button class="${BUTTON_CLASS}">출금</button>
      </section>
      <section
        class="m-auto max-w-screen-xl flex flex-col w-full justify-start items-center box-border sm:gap-24 gap-12 pb-12"
      >
        <h1 class="mt-8 text-4xl font-sans text-gray-600 dark:text-purple-100">
          7 월 내 역
        </h1>

        <history-form></history-form>
        <history-list></history-list>
      </section>
    </section>`;
  }
}
