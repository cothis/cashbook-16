import React from './core/react';
import Counter from './component/Counter';

const $app = document.querySelector('#App');

const updateDOM = () => {
  window.requestAnimationFrame(() => {
    if ($app) {
      let App;
      App = React.render(Counter, $app);
    }
  });
};

window.addEventListener('interuptUpdateDOM', () => {
  updateDOM();
});

updateDOM();
