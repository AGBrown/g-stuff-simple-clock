import React, { useEffect, useState } from 'react';
import './App.css';
import ButtonsIncrements from './options/ButtonsIncrements';
import ClockFace from './clock/ClockFace';
import * as graduationsUtils from './utils/Graduations';
import type { IClockHandsConfig } from './clock/Hands';
import { mergeHandsRotateConfig } from './clock/Hands';
import { getVersion } from './utils/version';

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
  const [state, setState] = useState('none');
  const [ver, setVer] = useState(props.version);
  const [date, setDate] = useState(new Date(Date.now()).valueOf());
  const [expandGradns, setExpandGradns] = useState(false);
  const [handsConfig, setHandsConfig] = useState(handsConfigDefault());
  const [gradnsConfig, setGradnsConfig] = useState(graduationsUtils.factory.default());

  useEffect(()=>{
    getVersion(setVer);
  },[])

  const buttonMutators = {
    setGradnsConfig,
    setHandsConfig
  };

  const clockProps = {
    state, setState,
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
      setGradnsConfig(t => graduationsUtils.merge(t, graduationsUtils.factory.final().show))
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
