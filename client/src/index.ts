import React from './core/react';
import Counter from './component/Counter';

const $app = <Element>document.querySelector('#App');

const updateDOM = () => {
  window.requestAnimationFrame(() => {
    let App;
    App = React.render(Counter, $app);
  });
};

window.addEventListener('interuptUpdateDOM', () => {
  updateDOM();
});

updateDOM();
