import Component from '@/view/components/component';
import html from '@/core/jsx';
import MainController from '@/controller/main';
import { UserState } from '@/store/user';

export default class UserInfoComponent extends Component {
  state: UserState;

  constructor() {
    super();
    this.state = { id: '', name: '' };

    MainController.subscribe(this, this.updateUser, 'user');
  }

  updateUser(user: UserState) {
    console.log(user);
    this.state = user;
    const $parent = this.$this.parentElement;
    const $new = this.createDom();
    $parent?.replaceChild($new, this.$this);
    this.$this = $new;
  }

  createDom(): HTMLElement {
    return html`<div>
      <div>유저 정보 확인</div>
      <div>${this.state.id}</div>
      <div>${this.state.name}</div>
    </div>`;
  }
}
