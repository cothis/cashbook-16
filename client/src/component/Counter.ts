import React from '../core/react';
import FC from '../core/FC';
import html from '../core/jsx';

const Counter: FC = () => {
  const [count, setCount] = React.useState(0);

  return {
    render: () => {
      return html`
        <div>
          <button onClick=${() => setCount(count - 1)}>-</button>
          <span>${count}</span>
          <button onClick=${() => setCount(count + 1)}>+</button>
        </div>
      `;
    },
  };
};

export default Counter;
