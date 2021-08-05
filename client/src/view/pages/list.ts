import Page from './page';
import html from '../../core/jsx';
import HistoryController from '../../controller/history';
import { getCategories, getMethods } from '../../api/apis';
import { getHistories } from '../../api/histories';
import ListController from '../../controller/list';

const THIS_MONTH = new Date().getMonth() + 1;

export default class ListPage extends Page {
  constructor(root: HTMLElement) {
    super(root);
  }

  async beforeMount() {
    const [categoreis, methods] = await Promise.all([
      getCategories(),
      getMethods(),
    ]);

    ListController.setCategories(categoreis);
    ListController.setMethods(methods);
  }

  createDom(): HTMLElement {
    return html`<section>
      <section
        class="h-6 w-full text-md text-center text-green-400 dark:text-purple-400"
      >
        운영체제 다크모드에 맞춰서 테마가 변해요!
      </section>
      <app-header active="list"></app-header>
      <pay-type></pay-type>
      <section
        class="m-auto max-w-screen-xl flex flex-col w-full justify-start items-center box-border sm:gap-24 gap-12 pb-12"
      >
        <h1 class="mt-8 text-4xl font-sans text-gray-600 dark:text-purple-100">
          ${THIS_MONTH} 월 내 역
        </h1>

        <history-form></history-form>
        <history-list></history-list>
      </section>
    </section>`;
  }
}
