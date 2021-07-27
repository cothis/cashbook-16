import React from './core/react';
import Counter from './component/Counter';

const $app = <Element>document.querySelector('#App');

const updateDOM = () => {
  window.requestAnimationFrame(() => {
    let App = React.render(Counter, $app);
    $app.innerHTML = '';
    $app.appendChild(App.render());
  });
};

window.addEventListener('interuptUpdateDOM', () => {
  updateDOM();
});

updateDOM();
