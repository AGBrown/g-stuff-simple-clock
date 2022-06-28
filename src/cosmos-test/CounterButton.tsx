import React from 'react';

function CounterButton(props: { disabled?: boolean, count: number, increment: () => void }) {
  const {disabled, count, increment} = props;
  return <button disabled={disabled ? true : undefined} onClick={increment}>{count}</button>;
}

export default CounterButton;
