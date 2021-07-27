import FC from './FC';

const React = (function () {
  let _val: any;
  return {
    render(Component: FC, $dom: Element) {
      const Comp = Component();
      const $comp = Comp.render();
      if ($comp) {
        $dom.appendChild($comp);
      }
      return Comp;
    },
    useState(initialState: any) {
      _val = _val || initialState;
      function setState(newState: any) {
        _val = newState;
        window.dispatchEvent(new CustomEvent('interruptUpdateDOM'));
      }
      return [_val, setState];
    },
  };
})();

export default React;
