import Component from './Component';
import html from '../../core/jsx';
import { categoryType } from '../../DTO/category';
import { $ } from '../../utils';

type EditableRowProps = {
  category: string;
  content: string;
  method: string;
  amount: number;
  onDeleteRow?: () => void;
  onAddRow?: (info: EditableRowState) => void;
};

export type EditableRowState = {
  category: string;
  content: string;
  method: string;
  amount: number;
};

class EditableRow extends Component<EditableRowProps, EditableRowState> {
  constructor(props: EditableRowProps) {
    super(props);
    this.state = {
      ...props,
    };
  }

  chromeOptionHack = () => {
    const { category, method } = this.state;
    setTimeout(() => {
      const $categoryOption = this.$this?.querySelector(
        `option[value="${category}"]`
      );
      const $methodOption = this.$this?.querySelector(
        `option[value="${method}"]`
      );
      $categoryOption?.removeAttribute('selected');
      $categoryOption?.setAttribute('selected', '');
      $methodOption?.removeAttribute('selected');
      $methodOption?.setAttribute('selected', '');
    }, 1);
  };

  createDom(): HTMLElement {
    const { amount, category, content, method } = this.state;
    this.chromeOptionHack();
    return html`
      <form
        class="flex flex-row w-full h-12 items-center justify-between"
        onsubmit="return false;"
      >
        <select
          id="category"
          name="category"
          class="w-28 dark:text-white"
          value="${category}"
        >
          <option value="문화/여가" class="w-28 truncate dark:text-white">
            문화/여가
          </option>
          <option value="생활" class="w-28 truncate dark:text-white">
            생활
          </option>
          <option value="의료/건강" class="w-28 truncate dark:text-white">
            의료/건강
          </option>
          <option value="교통" class="w-28 truncate dark:text-white">
            교통
          </option>
          <option value="식비" class="w-28 truncate dark:text-white">
            식비
          </option>
          <option value="미분류" class="w-28 truncate dark:text-white">
            미분류
          </option>
        </select>
        <input
          id="ioContent"
          class="w-56 truncate dark:text-white"
          placeholder="새로운 내용"
          autocomplete="off"
          value="${content === '' ? false : content}"
        />
        <select
          id="method"
          name="method"
          class="hidden sm:block w-40 truncate dark:text-white"
        >
          <option
            value="카드"
            class="hidden sm:block w-40 truncate dark:text-white"
          >
            카드
          </option>
          <option
            value="현금"
            class="hidden sm:block w-40 truncate dark:text-white"
          >
            현금
          </option>
          <option
            value="계좌이체"
            class="hidden sm:block w-40 truncate dark:text-white"
          >
            계좌이체
          </option>
        </select>
        <input
          type="number"
          class="w-24 truncate sm:right-0 ${amount >= 0
            ? 'text-green-400'
            : 'text-red-400'} text-right"
          placeholder="금액 (원)"
          autocomplete="off"
          title="형식: 숫자"
          value="${amount === 0 ? false : amount}"
        />
        <button class="p-2">
          ${this.props?.onDeleteRow
            ? html`
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 16C12.3765 16 16 12.3686 16 8C16 3.62353 12.3686 0 7.99216 0C3.62353 0 0 3.62353 0 8C0 12.3686 3.63137 16 8 16ZM4.83137 8.6902C4.36863 8.6902 4.0549 8.44706 4.0549 8.01569C4.0549 7.57647 4.35294 7.32549 4.83137 7.32549H11.1686C11.6392 7.32549 11.9294 7.57647 11.9294 8.01569C11.9294 8.44706 11.6235 8.6902 11.1686 8.6902H4.83137Z"
                    fill="#F87171"
                  />
                </svg>
              `
            : html`
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.701212 7.20121H5.79879V12.2988C5.79879 12.677 6.11394 13 6.5 13C6.88606 13 7.20909 12.677 7.20909 12.2988V7.20121H12.2988C12.677 7.20121 13 6.88606 13 6.5C13 6.11394 12.677 5.79091 12.2988 5.79091H7.20909V0.701212C7.20909 0.32303 6.88606 0 6.5 0C6.11394 0 5.79879 0.32303 5.79879 0.701212V5.79091H0.701212C0.32303 5.79091 0 6.11394 0 6.5C0 6.88606 0.32303 7.20121 0.701212 7.20121Z"
                    fill="#34D399"
                  />
                </svg>
              `}
        </button>
      </form>
    `;
  }
}

export default EditableRow;
