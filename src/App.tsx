import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ButtonsIncrements from './ButtonsIncrements';
import ClockFace from './ClockFace';

function App(props: { msg: string }) {
  const [date, _] = useState(new Date(Date.now()));
  const [expandTicks, setExpandTicks] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setExpandTicks(true);
    }, 300);
  }, [expandTicks]);

  return (
    <div className="App">
      <header>
          {props.msg}
      </header>
      <ButtonsIncrements />
      <ClockFace { ...{ date, expandTicks } } />
    </div>
  );
}

export default App;
