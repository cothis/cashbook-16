import Component from './Component';
import html from '../../core/jsx';
import { categoryType } from '../../DTO/category';
import { $ } from '../../utils';

type EditableRowProps = {
  category: string;
  content: string;
  method: string;
  amount: number;
  onDeleteRow: () => void;
  onAddRow: () => void;
};

type EditableRowState = {
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

  createDom(): HTMLElement {
    const { amount, category, content, method } = this.state;
    return html`
      <form
        class="flex flex-row w-full h-12 items-center justify-between"
        onsubmit="return false;"
      >
        <select id="category" name="category" class="w-28 dark:text-white">
          <option
            value="문화/여가"
            class="w-28 truncate dark:text-white"
            selected=${category === '문화/여가'}
          >
            문화/여가
          </option>
          <option
            value="생활"
            class="w-28 truncate dark:text-white"
            selected=${category === '생활'}
          >
            생활
          </option>
          <option
            value="의료/건강"
            class="w-28 truncate dark:text-white"
            selected=${category === '의료/건강'}
          >
            의료/건강
          </option>
          <option
            value="교통"
            class="w-28 truncate dark:text-white"
            selected=${category === '교통'}
          >
            교통
          </option>
          <option
            value="식비"
            class="w-28 truncate dark:text-white"
            selected=${category === '식비'}
          >
            식비
          </option>
          <option
            value="미분류"
            class="w-28 truncate dark:text-white"
            selected=${category === '미분류'}
          >
            미분류
          </option>
        </select>
        <input
          id="ioContent"
          class="w-56 truncate dark:text-white"
          placeholder="입/지출 내용"
          autocomplete="off"
          value="${content}"
        />
        <select
          id="method"
          name="method"
          class="hidden sm:block w-40 truncate dark:text-white"
        >
          <option
            value="카드"
            class="hidden sm:block w-40 truncate dark:text-white"
            selected=${method === '카드'}
          >
            카드
          </option>
          <option
            value="현금"
            class="hidden sm:block w-40 truncate dark:text-white"
            selected=${method === '현금'}
          >
            현금
          </option>
          <option
            value="현대카드"
            class="hidden sm:block w-40 truncate dark:text-white"
            selected=${method === '현대카드'}
          >
            현대카드
          </option>
        </select>
        <input
          type="number"
          class="w-24 truncate sm:right-0 ${amount > 0
            ? 'text-green-400'
            : 'text-red-400'} text-right"
          placeholder="금액 (원)"
          autocomplete="off"
          title="형식: 숫자"
          value="${amount}"
        />
        <button class="p-2">
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
        </button>
      </form>
    `;
  }
}

export default EditableRow;
