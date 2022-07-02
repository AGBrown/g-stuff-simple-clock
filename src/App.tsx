import React, { useEffect, useState } from 'react';
import './App.css';
import ButtonsIncrements from './options/ButtonsIncrements';
import ClockFace from './clock/ClockFace';
import { IClockGradnsConfig, mergeGradnsConfig } from './types/ClockFaceTypes';
import type { IClockHandsConfig } from './clock/Hands';
import { mergeHandsRotateConfig } from './clock/Hands';

const gradnsConfigDefault = (): IClockGradnsConfig => ({
  show: {
    min5Label: false,
    minLabel: false,
    minGradns: true,
    pastTo: false,
    hourLabel: false,
    hourGradns: true,
  }
});
const gradnsConfigFinal = (): IClockGradnsConfig => ({
  show: {
    min5Label: false,
    minLabel: false,
    minGradns: true,
    pastTo: false,
    hourLabel: false,
    hourGradns: true
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

function App(props: { version: string }) {
  const [ver, setVer] = useState(props.version);
  const [date, setDate] = useState(new Date(Date.now()).valueOf());
  const [expandGradns, setExpandGradns] = useState(false);
  const [handsConfig, setHandsConfig] = useState(handsConfigDefault());
  const [gradnsConfig, setGradnsConfig] = useState(gradnsConfigDefault());

  useEffect(()=>{
    getVersion(setVer);
  },[])

  const buttonMutators = {
    setGradnsConfig,
    setHandsConfig
  };

  const clockProps = {
    handsConfig,
    gradnsConfig,
    date,
    setDate,
    expandGradns,
    stateMutators: buttonMutators
  };

  useEffect(() => {
    setTimeout(() => {
      setExpandGradns(true);
    }, 300);
    setTimeout(() => {
      setHandsConfig(c => mergeHandsRotateConfig(c, { isStarted: true }));
    }, 1000);
    setTimeout(() => {
      setHandsConfig(c => mergeHandsRotateConfig(c, { isComplete: true }));
      setGradnsConfig(t => mergeGradnsConfig(t, gradnsConfigFinal().show))
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
