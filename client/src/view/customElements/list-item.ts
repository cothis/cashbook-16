import html from '../../core/jsx';

class ListItem extends HTMLElement {
  constructor() {
    super();
  }

  createDOM() {
    return html`
      <section class="w-full md:w-3/4 flex flex-col">
        <div class="flex flex-row w-full justify-between items-center">
          <h2 class="text-lg text-green-400 dark:text-green-300">7월 9일 금</h2>
          <div>
            <span class="text-xs text-red-400 text-right font-thin"
              >-50,000원</span
            >
          </div>
        </div>
        <div class="flex flex-row w-full h-12 items-center justify-between">
          <span class="w-28 truncate dark:text-purple-200">의료/건강</span>
          <span class="w-56 truncate dark:text-purple-200">백신접종</span>
          <span class="hidden sm:block w-40 truncate dark:text-purple-200"
            >현대카드</span
          >
          <span class="w-32 truncate right-0 text-red-400 text-right"
            >-50,000원</span
          >
        </div>
      </section>
    `;
  }

  render() {}
}
