import React, { useEffect, useState } from 'react';
import './App.css';
import ButtonsIncrements from './ButtonsIncrements';
import ClockFace from './ClockFace';
import { IClockHandsConfig, IClockTicksConfig, mergeTicksConfig } from './types/ClockFaceTypes';

const ticksConfigDefault = (): IClockTicksConfig => ({
  show: {
    min5Label: false,
    minLabel: false,
    minTicks: true,
    hourLabel: false,
    hourTicks: true,
  }
});
const ticksConfigFinal = (): IClockTicksConfig => ({
  show: {
    min5Label: false,
    minLabel: false,
    minTicks: true,
    hourLabel: false,
    hourTicks: true
  }
});
const handsConfigDefault = (): IClockHandsConfig => ({
  jump: {
    min: true,
    hour: false
  }
});

function App(props: { msg: string }) {
  const [date, setDate] = useState(new Date(Date.now()).valueOf());
  const [expandTicks, setExpandTicks] = useState(false);
  const [rotateHands, setRotateHands] = useState(false);
  const [handsRotated, setHandsRotated] = useState(false);
  const [handsConfig, setHandsConfig] = useState(handsConfigDefault());
  const [ticksConfig, setTicksConfig] = useState(ticksConfigDefault());

  const buttonMutators = {
    setTicksConfig,
    setHandsConfig
  };

  const clockProps = {
    handsConfig,
    ticksConfig,
    date,
    setDate,
    expandTicks,
    rotateHands,
    handsRotated,
    stateMutators: buttonMutators
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
      setTicksConfig(t => mergeTicksConfig(t, ticksConfigFinal().show))
    }, 3000);
  }, []);

  return (
    <div className="App">
      <header>
          {props.msg}
      </header>
      <ButtonsIncrements { ...clockProps } />
      <ClockFace { ...clockProps } />
    </div>
  );
}

export default App;
