import View from '../view';
import html from '../../core/jsx';
import { PaymentCategory } from '../../types';
import CategoryController from '../../controller/category';
import { CategoryState } from '../../store/category';

export default class CategorySelect extends HTMLElement implements View {
  categories: PaymentCategory[] = [];

  constructor() {
    super();

    this.categories = CategoryController.getCategories() ?? [];
    this.render();
  }

  static define() {
    window.customElements.define('category-select', CategorySelect);
  }

  createDom = (): HTMLElement => {
    return html`<div>
      <select
        id="category"
        name="category"
        size="3"
        class="w-full sm:w-28 dark:text-white"
      >
        ${this.categories.map(
          (category, i) =>
            html`<option
              value="${category.name}"
              class="w-full sm:w-28 truncate dark:text-white"
              selected=${i == 0}
            >
              ${category.name}
            </option>`
        )}
      </select>
    </div>`;
  };

  render = (): void => {
    const dom = this.createDom();
    this.innerHTML = '';
    this.append(...dom.children);
  };
}
