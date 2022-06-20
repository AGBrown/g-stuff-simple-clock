import React, { useEffect, useState } from 'react';
import './App.css';
import ButtonsIncrements from './ButtonsIncrements';
import ClockFace from './ClockFace';
import { IClockHandsConfig, IClockTicksConfig } from './types/ClockFaceTypes';

function App(props: { msg: string }) {
  const handsConfigDefault: IClockHandsConfig = {
    jump: {
      min: true,
      hour: false
    }
  };
  const ticksConfigDefault: IClockTicksConfig = {
    show: {
      min5Label: false,
      minLabel: false,
      minTicks: true,
      hourLabel: false,
      hourTicks: true,
    }
  };
  const ticksConfigFinal: IClockTicksConfig = {
    show: {
      min5Label: false,
      minLabel: false,
      minTicks: true,
      hourLabel: false,
      hourTicks: true
    }
  };

  const [date, setDate] = useState(new Date(Date.now()).valueOf());
  const [expandTicks, setExpandTicks] = useState(false);
  const [rotateHands, setRotateHands] = useState(false);
  const [handsRotated, setHandsRotated] = useState(false);
  const [handsConfig, setHandsConfig] = useState(handsConfigDefault);
  const [ticksConfig, setTicksConfig] = useState(ticksConfigDefault);

  const clockProps = {
    handsConfig,
    ticksConfig,
    date,
    expandTicks,
    rotateHands,
    handsRotated
  };

  const buttonMutators = {
    setTicksConfig,
    setHandsConfig
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
  }, []);

  return (
    <div className="App">
      <header>
          {props.msg}
      </header>
      <ButtonsIncrements { ...{ date, setDate, ticksConfig, stateMutators: buttonMutators } } />
      <ClockFace { ...clockProps } />
    </div>
  );
}

export default App;
