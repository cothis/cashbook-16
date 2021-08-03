import Page from './page';
import html from '../../core/jsx';
import logo from '../../../assets/logo.png';

const today = '2020-08-01';

const days = [
  {
    date: '7월 15일 목',
    totalIncome: '12000',
    totalSpend: '-56240',
    detail: [
      {
        category: '미분류',
        content: '테스트',
        method: '현금',
        amount: '20000',
      },
      {
        category: '미분류',
        content: '당근이 인형 중고판매',
        method: '현금',
        amount: '12000',
      },
      {
        category: '문화/여가',
        content: '스트리밍서비스 정기 결제',
        method: '현대카드',
        amount: '-10900',
      },
      {
        category: '교통',
        content: '후불 교통비 결제',
        method: '현대카드',
        amount: '-45340',
      },
    ],
  },
  {
    date: '7월 14일 수',
    totalIncome: '1500000',
    totalSpend: '0',
    detail: [
      {
        category: '미분류',
        content: '우아한 형제들',
        method: '카카오뱅크',
        amount: '1500000',
      },
    ],
  },
  {
    date: '7월 12일 월',
    totalIncome: '0',
    totalSpend: '-100000',
    detail: [
      {
        category: '쇼핑',
        content: '쿠팡 (쿠페이)',
        method: '카드',
        amount: '-100000',
      },
    ],
  },
  {
    date: '7월 10일 토',
    totalIncome: '0',
    totalSpend: '-16000',
    detail: [
      {
        category: '식비',
        content: '연래춘(숭실대앞)',
        method: '현대카드',
        amount: '-16000',
      },
    ],
  },
  {
    date: '7월 9일 금',
    totalIncome: '0',
    totalSpend: '-50000',
    detail: [
      {
        category: '의료/건강',
        content: '백신접종',
        method: '현대카드',
        amount: '-50000',
      },
    ],
  },
];

export default class ListPage extends Page {
  constructor(root: HTMLElement) {
    super(root);
  }

  createDom(): HTMLElement {
    return html`<section id="app" class="dark:bg-gray-800">
      <section
        class="h-6 w-full text-md text-center text-green-400 dark:text-purple-400"
      >
        운영체제 다크모드에 맞춰서 테마가 변해요!
      </section>
      <header
        class="
        container
        flex flex-row
        md:h-20
        sm:h-16
        h-12
        items-center
        justify-start
        gap-4
        border-b-2 border-gray-50
        box-border
      "
      >
        <span class="cursor-pointer h-full sm:ml-16 ml-2 mr-4 p-2">
          <img src="${logo}" alt="" class="h-full w-auto object-fill" />
        </span>
        <button
          class="
          md:w-24
          sm:w-20
          w-16
          h-full
          bg-green-400
          text-white
          hover:text-white
        "
        >
          리스트
        </button>
        <a class="h-full" href="calendar.html">
          <button
            class="
            md:w-24
            sm:w-20
            w-16
            h-full
            hover:text-green-400
            dark:text-white
          "
          >
            캘린더
          </button>
        </a>
        <button
          class="md:w-24 sm:w-20 w-16 h-full hover:text-green-400 dark:text-white"
        >
          그래프
        </button>
      </header>
      <section
        class="
        flex flex-row
        h-12
        w-full
        justify-center
        text-sm text-black
        dark:text-white
        bg-gray-50
        dark:bg-gray-700
        sticky
        top-0
      "
      >
        <button
          class="
          md:w-24
          sm:w-20
          w-16
          h-full
          hover:text-green-400
          dark:text-white
          border-b-2 border-solid border-green-300
        "
        >
          전체
        </button>
        <button
          class="md:w-24 sm:w-20 w-16 h-full hover:text-green-400 dark:text-white"
        >
          입금
        </button>
        <button
          class="md:w-24 sm:w-20 w-16 h-full hover:text-green-400 dark:text-white"
        >
          출금
        </button>
      </section>
      <section
        class="
        m-auto
        max-w-screen-xl
        flex flex-col
        w-full
        justify-start
        items-center
        box-border
        sm:gap-24
        gap-12
        pb-12
      "
      >
        <h1 class="mt-8 text-4xl font-sans text-gray-600 dark:text-purple-100">
          7 월 내 역
        </h1>

        <form
          action="/api"
          method="post"
          class="w-full md:w-3/4 flex flex-col"
          onsubmit="return false;"
        >
          <h2 class="text-lg text-green-400 dark:text-green-300 mb-4">
            새 내역 추가
          </h2>
          <input
            id="date"
            type="date"
            class="w-full sm:w-36 truncate text-black dark:text-white mb-4"
            value="2021-08-01"
          />
          <div
            class="
            flex flex-col
            sm:flex-row
            w-full
            sm:h-12
            gap-6
            sm:gap-0
            items-start
            sm:items-center
            pl-1
            sm:pl-0
            justify-between
          "
          >
            <select
              id="category"
              name="category"
              size="3"
              class="w-full sm:w-28 dark:text-white"
            >
              <option
                value="문화/여가"
                class="w-full sm:w-28 truncate dark:text-white"
                selected
              >
                문화/여가
              </option>
              <option
                value="생활"
                class="w-full sm:w-28 truncate dark:text-white"
              >
                생활
              </option>
              <option
                value="의료/건강"
                class="w-full sm:w-28 truncate dark:text-white"
              >
                의료/건강
              </option>
              <option
                value="교통"
                class="w-full sm:w-28 truncate dark:text-white"
              >
                교통
              </option>
              <option
                value="식비"
                class="w-full sm:w-28 truncate dark:text-white"
              >
                식비
              </option>
              <option
                value="미분류"
                class="w-full sm:w-28 truncate dark:text-white"
              >
                미분류
              </option>
            </select>
            <input
              id="ioContent"
              class="w-full sm:w-56 truncate dark:text-white"
              placeholder="입/지출 내용"
              autocomplete="off"
            />
            <select
              id="method"
              name="method"
              size="3"
              class="w-full sm:w-40 dark:text-white"
            >
              <option
                value="카드"
                class="w-full sm:w-40 truncate dark:text-white"
                selected
              >
                카드
              </option>
              <option
                value="현금"
                class="w-full sm:w-40 truncate dark:text-white"
              >
                현금
              </option>
              <option
                value="현대카드"
                class="w-full sm:w-40 truncate dark:text-white"
              >
                현대카드
              </option>
            </select>
            <input
              type="number"
              class="
              w-full
              sm:w-32
              truncate
              sm:right-0
              dark:text-white
              sm:text-right
            "
              placeholder="금액 (원)"
              autocomplete="off"
              title="형식: 숫자"
            />
          </div>
          <div class="flex flex-row w-full items-center justify-end">
            <input
              id="submit"
              type="submit"
              class="
              text-md text-white
              mt-6
              rounded-md
              bg-green-400
              dark:bg-green-500
              cursor-pointer
              p-1
              pl-3
              pr-3
            "
              value="새 내역 추가"
            />
          </div>
        </form>

        ${days.map(
          (day) => html`<section class="w-full md:w-3/4 flex flex-col">
            <list-title
              date="${day.date}"
              income="${day.totalIncome}"
              spend="${day.totalSpend}"
            ></list-title>
            ${day.detail.map(
              (el) =>
                html`<list-item
                  category="${el.category}"
                  content="${el.content}"
                  method="${el.method}"
                  amount="${el.amount}"
                ></list-item>`
            )}
          </section>`
        )}

        <div class="hidden sm:block fixed top-1/2 left-0 p-8 w-10 slide-btn">
          <
        </div>
        <div class="hidden sm:block fixed top-1/2 right-0 p-8 w-10 slide-btn">
          >
        </div>
      </section>
    </section>`;
  }
}
