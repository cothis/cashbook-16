import Page from './page';
import html from '../../core/jsx';

export default class ListPage extends Page {
  constructor(root: HTMLElement) {
    super(root);
  }

  createDom(): HTMLElement {
    return html` <div class="container mx-auto">
      <div>two</div>
      <div>two</div>
      <div>two</div>
      <div>two</div>
      <div>two</div>
      <div>two</div>
      <div>two</div>
      <div>two</div>
      <div>two</div>
      <div>two</div>
      <div>two</div>
      <div>two</div>
      <div>two</div>
      <div class="flex">two</div>
    </div>`;
  }
}
