import React, { useEffect, useState } from 'react';
import './App.css';
import ButtonsIncrements from './ButtonsIncrements';
import ClockFace from './ClockFace';

function App(props: { msg: string }) {
  const [date, setDate] = useState(new Date(Date.now()).valueOf());
  const [expandTicks, setExpandTicks] = useState(false);
  const [rotateHands, setRotateHands] = useState(false);
  const [handsRotated, setHandsRotated] = useState(false);

  const handsConfig = {
    jump: {
      min: false,
      hour: false
    }
  };
  const clockProps = {
    handsConfig,
    date,
    expandTicks,
    rotateHands,
    handsRotated
  };

  useEffect(() => {
    setTimeout(() => {
      setExpandTicks(true);
    }, 300);
    setTimeout(() => {
      setRotateHands(true);
    }, 1000);
    setTimeout(() => {
      setHandsRotated(true);
    }, 3000);
  }, [expandTicks]);

  return (
    <div className="App">
      <header>
          {props.msg}
      </header>
      <ButtonsIncrements { ...{ date, setDate } } />
      <ClockFace { ...clockProps } />
    </div>
  );
}

export default App;
