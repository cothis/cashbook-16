import html from '../../core/jsx';
import View from '../view';
import logo from '../../../assets/logo.png';

interface State {
  active: 'list' | 'calendar' | 'graph';
  [name: string]: string | undefined;
}

// const APP_HEADER_CLASS =
// 'container flex flex-row md:h-20 sm:h-16 h-12 items-center justify-start gap-4 border-b-2 border-gray-50 box-border';
const APP_HEADER_CLASS = `navbar mx-auto flex flex-row md:h-20 sm:h-16 h-12 items-center justify-start gap-4`;
const BUTTON_CLASS =
  'md:w-24 sm:w-20 w-16 h-full text-center flex flex-col justify-center cursor-pointer';
const ACTIVE_CLASS = 'bg-green-400 text-white hover:text-white';
const DEACTIVE_CLASS = 'hover:text-green-400 dark:text-white';

export default class AppHeader extends HTMLElement implements View {
  private state: State;

  constructor() {
    super();
    this.state = { active: 'list' };
    this.className = APP_HEADER_CLASS;
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.state[name] = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ['active'];
  }

  static define() {
    window.customElements.define('app-header', AppHeader);
  }

  render(): void {
    const dom = this.createDom();
    this.innerHTML = '';
    this.append(...dom.children);
  }

  createDom(): HTMLElement {
    return html`<header>
      <span class="cursor-pointer h-full sm:ml-16 ml-2 mr-4 p-2">
        <img src="${logo}" alt="" class="h-full w-auto object-fill" />
      </span>
      <router-link
        to="list"
        class="${BUTTON_CLASS} ${this.state.active === 'list'
          ? ACTIVE_CLASS
          : DEACTIVE_CLASS}"
        >리스트
      </router-link>
      <router-link
        to="calendar"
        class="${BUTTON_CLASS} ${this.state.active === 'calendar'
          ? ACTIVE_CLASS
          : DEACTIVE_CLASS}"
        >캘린더
      </router-link>
    </header>`;
  }
}
