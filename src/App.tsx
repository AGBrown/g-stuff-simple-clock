import React, { useEffect, useState } from 'react';
import './App.css';
import ButtonsIncrements from './ButtonsIncrements';
import ClockFace from './ClockFace';

function App(props: { msg: string }) {
  const handsConfigDefault = {
    jump: {
      min: true,
      hour: false
    }
  };
  const ticksConfigDefault = {
    show: {
      min: false,
      min5: false,
      hour: false
    }
  };
  const ticksConfigFinal = {
    show: {
      min: false,
      min5: false,
      hour: false
    }
  };

  const [date, setDate] = useState(new Date(Date.now()).valueOf());
  const [expandTicks, setExpandTicks] = useState(false);
  const [rotateHands, setRotateHands] = useState(false);
  const [handsRotated, setHandsRotated] = useState(false);
  const [handsConfig, _] = useState(handsConfigDefault);
  const [ticksConfig, setTicksConfig] = useState(ticksConfigDefault);

  const clockProps = {
    handsConfig,
    ticksConfig,
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
      setTicksConfig({
        ...ticksConfig,
        show: {
          ...ticksConfig.show,
          ...ticksConfigFinal.show
        }
      })
    }, 3000);
  }, [expandTicks, rotateHands, handsRotated, ticksConfig]);

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
