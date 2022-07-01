import React, { useEffect, useState } from 'react';
import './App.css';
import ButtonsIncrements from './options/ButtonsIncrements';
import ClockFace from './clock/ClockFace';
import { IClockTicksConfig, mergeTicksConfig } from './types/ClockFaceTypes';
import type { IClockHandsConfig } from './clock/Hands';
import { mergeHandsRotateConfig } from './clock/Hands';

const ticksConfigDefault = (): IClockTicksConfig => ({
  show: {
    min5Label: false,
    minLabel: false,
    minTicks: true,
    pastTo: false,
    hourLabel: false,
    hourTicks: true,
  }
});
const ticksConfigFinal = (): IClockTicksConfig => ({
  show: {
    min5Label: false,
    minLabel: false,
    minTicks: true,
    pastTo: false,
    hourLabel: false,
    hourTicks: true
  }
});
const handsConfigDefault = (): IClockHandsConfig => ({
  jump: {
    min: true,
    hour: false
  },
  rotate: {
    isStarted: false,
    isComplete: false
  }
});

const getVersion = (setVersion: (ver: string) => void) => {
  fetch('version.json', {
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  })
  .then(function(response){
    return response.json();
  })
  .then(function(versionData){
    setVersion(versionData.version);
  });
};

function App(props: { version: string }) {
  const [ver, setVer] = useState(props.version);
  const [date, setDate] = useState(new Date(Date.now()).valueOf());
  const [expandTicks, setExpandTicks] = useState(false);
  const [handsConfig, setHandsConfig] = useState(handsConfigDefault());
  const [ticksConfig, setTicksConfig] = useState(ticksConfigDefault());

  useEffect(()=>{
    getVersion(setVer);
  },[])

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
    stateMutators: buttonMutators
  };

  useEffect(() => {
    setTimeout(() => {
      setExpandTicks(true);
    }, 300);
    setTimeout(() => {
      setHandsConfig(c => mergeHandsRotateConfig(c, { isStarted: true }));
    }, 1000);
    setTimeout(() => {
      setHandsConfig(c => mergeHandsRotateConfig(c, { isComplete: true }));
      setTicksConfig(t => mergeTicksConfig(t, ticksConfigFinal().show))
    }, 3000);
  }, []);

  return (
    <div className="App">
      <ButtonsIncrements { ...clockProps } />
      <ClockFace { ...clockProps } />
      <span className="version">{ver}</span>
    </div>
  );
}

export default App;
