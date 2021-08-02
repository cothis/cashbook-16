import Page from './page';
import html from '../../core/jsx';
import logo from '../../../assets/logo.png';

const today = '2020-08-01';

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

        <section class="w-full md:w-3/4 flex flex-col">
          <div class="flex flex-row w-full justify-between items-center">
            <h2 class="text-lg text-green-400 dark:text-green-300">
              7월 15일 목
            </h2>
            <div>
              <span class="text-xs text-green-400 text-right font-thin"
                >+12,000원</span
              >
              <span class="text-xs text-red-400 text-right font-thin"
                >-56,240원</span
              >
            </div>
          </div>
          <div class="flex flex-row w-full h-12 items-center justify-between">
            <span class="w-28 truncate dark:text-purple-200">미분류</span>
            <span class="w-56 truncate dark:text-purple-200"
              >당근이 인형 중고판매</span
            >
            <span class="hidden sm:block w-40 truncate dark:text-purple-200"
              >현금</span
            >
            <span class="w-32 truncate right-0 text-green-400 text-right"
              >+12,000원</span
            >
          </div>
          <div class="flex flex-row w-full h-12 items-center justify-between">
            <span class="w-28 truncate dark:text-purple-200">문화/여가</span>
            <span class="w-56 truncate dark:text-purple-200"
              >스트리밍서비스 정기 결제</span
            >
            <span class="hidden sm:block w-40 truncate dark:text-purple-200"
              >현대카드</span
            >
            <span class="w-32 truncate right-0 text-red-400 text-right"
              >-10,900원</span
            >
          </div>
          <div class="flex flex-row w-full h-12 items-center justify-between">
            <span class="w-28 truncate dark:text-purple-200">교통</span>
            <span class="w-56 truncate dark:text-purple-200"
              >후불 교통비 결제</span
            >
            <span class="hidden sm:block w-40 truncate dark:text-purple-200"
              >현대카드</span
            >
            <span class="w-32 truncate right-0 text-red-400 text-right"
              >-45,340원</span
            >
          </div>
        </section>

        <section class="w-full md:w-3/4 flex flex-col">
          <div class="flex flex-row w-full justify-between items-center">
            <h2 class="text-lg text-green-400 dark:text-green-300">
              7월 14일 수
            </h2>
            <div>
              <span class="text-xs text-green-400 text-right font-thin"
                >+1,500,000원</span
              >
            </div>
          </div>
          <div class="flex flex-row w-full h-12 items-center justify-between">
            <span class="w-28 truncate dark:text-purple-200">미분류</span>
            <span class="w-56 truncate dark:text-purple-200"
              >(주)우아한형제들</span
            >
            <span class="hidden sm:block w-40 truncate dark:text-purple-200"
              >카카오뱅크</span
            >
            <span class="w-32 truncate right-0 text-green-400 text-right"
              >+1,500,000원</span
            >
          </div>
        </section>

        <section class="w-full md:w-3/4 flex flex-col">
          <div class="flex flex-row w-full justify-between items-center">
            <h2 class="text-lg text-green-400 dark:text-green-300">
              7월 12일 월
            </h2>
            <div>
              <span class="text-xs text-red-400 text-right font-thin"
                >-100,000원</span
              >
            </div>
          </div>
          <div class="flex flex-row w-full h-12 items-center justify-between">
            <span class="w-28 truncate dark:text-purple-200">쇼핑</span>
            <span class="w-56 truncate dark:text-purple-200"
              >쿠팡 (쿠페이)</span
            >
            <span class="hidden sm:block w-40 truncate dark:text-purple-200"
              >카드</span
            >
            <span class="w-32 truncate right-0 text-red-400 text-right"
              >-100,000원</span
            >
          </div>
        </section>
        <section class="w-full md:w-3/4 flex flex-col">
          <div class="flex flex-row w-full justify-between items-center">
            <h2 class="text-lg text-green-400 dark:text-green-300">
              7월 10일 토
            </h2>
            <div>
              <span class="text-xs text-red-400 text-right font-thin"
                >-16,000원</span
              >
            </div>
          </div>
          <div class="flex flex-row w-full h-12 items-center justify-between">
            <span class="w-28 truncate dark:text-purple-200">식비</span>
            <span class="w-56 truncate dark:text-purple-200"
              >연래춘(숭실대앞)</span
            >
            <span class="hidden sm:block w-40 truncate dark:text-purple-200"
              >현대카드</span
            >
            <span class="w-32 truncate right-0 text-red-400 text-right"
              >-16,000원</span
            >
          </div>
        </section>
        <section class="w-full md:w-3/4 flex flex-col">
          <div class="flex flex-row w-full justify-between items-center">
            <h2 class="text-lg text-green-400 dark:text-green-300">
              7월 9일 금
            </h2>
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
