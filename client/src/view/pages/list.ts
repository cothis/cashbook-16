import Page from './page';
import html from '../../core/jsx';
import logo from './logo.png';

const today = '2020-08-01';

export default class ListPage extends Page {
  constructor(root: HTMLElement) {
    super(root);
  }

  createDom(): HTMLElement {
    return html` <section
      class="flex flex-col items-center w-full h-screen bg-gray-200"
    >
      <section class="w-full bg-gray-400 flex">
        <div class="flex h-20 gap-x-4">
          <div><img src="${logo}" class="h-full" /></div>
          <div class="flex gap-x-4 items-center">
            <button type="button">리스트</button>
            <button type="button">캘린더</button>
            <button type="button">그래프</button>
          </div>
        </div>
      </section>
      <div class="container flex flex-col flex-grow bg-white">
        <div class="flex gap-x-4 justify-center">
          <button type="button">전체</button>
          <button type="button">입금</button>
          <button type="button">출금</button>
        </div>
        <div class="flex flex-col flex-grow">
          <div class="text-center">7월 내역</div>
          <div class="flex flex-col">
            <span>새 내역 추가</span>
            <div
              class="
            flex flex-col
            sm:flex-row
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
          </div>
          <ul class="flex flex-col flex-grow gap-y-4">
            <li>
              <div class="flex justify-between">
                <span>7월 15일 목</span>
                <div>
                  <span>+12,000원</span>
                  <span>-56,240원</span>
                </div>
              </div>
              <ul class="flex flex-col">
                <li class="grid grid-cols-4 sm:grid-cols-5">
                  <div class="truncate">미분류</div>
                  <div class="truncate col-span-2">당근이 인형 중고판매</div>
                  <div class="hidden sm:block truncate">현금</div>
                  <div class="truncate text-right">+12,000원</div>
                </li>
                <li class="grid grid-cols-4 sm:grid-cols-5">
                  <div class="truncate">문화/여가</div>
                  <div class="truncate col-span-2">
                    스트리밍서비스 정기 결제
                  </div>
                  <div class="hidden sm:block truncate">현대카드</div>
                  <div class="truncate text-right">-10,900원</div>
                </li>
              </ul>
            </li>
            <li>
              <div class="flex justify-between">
                <span>7월 14일 수</span>
                <div>
                  <span>+12,000원</span>
                </div>
              </div>
              <ul class="flex flex-col">
                <li class="grid grid-cols-4 sm:grid-cols-5">
                  <div class="truncate">미분류</div>
                  <div class="truncate col-span-2">(주)우아한형제들</div>
                  <div class="hidden sm:block truncate">카카오뱅크</div>
                  <div class="truncate text-right">+1,500,000원</div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>`;
  }
}
