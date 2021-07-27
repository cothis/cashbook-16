import React from '../core/react';
import FC from '../core/FC';
import html from '../core/jsx';

const Counter: FC = () => {
  const [count, setCount] = React.useState(0);

  return {
    render: () => {
      const $dom = html`
        <div>
          <button onClick=${() => setCount(count - 1)}>-</button>
          <span>${count}</span>
          <button onClick=${() => setCount(count + 1)}>+</button>
        </div>
      `;
      return $dom;
    },
  };
};

export default Counter;
