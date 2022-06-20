import React from 'react';
import moment from 'moment';
import './App.css';
import {
  IClockTicksConfig,
  IClockHandsConfig,
  IClockTicksShowConfig,
  IClockHandsJumpConfig,
} from './types/ClockFaceTypes';
import {
  mergeHandsConfig,
  mergeTicksConfig,
} from './types/ClockFaceTypes';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

type IButtonsIncrementsProps = {
  date: number;
  setDate: (date: number) => void;
  ticksConfig: IClockTicksConfig;
  handsConfig: IClockHandsConfig;
  stateMutators: {
    setTicksConfig: (ticksConfig: IClockTicksConfig) => void;
    setHandsConfig: (handsConfig: IClockHandsConfig) => void;
  }
}

function ButtonsIncrements(props: IButtonsIncrementsProps) {
  const setNewDate = (updateDate: (m: moment.Moment) => void) => {
    const newDate = new Date(props.date);
    const m = moment(newDate);
    updateDate(m);
    props.setDate(m.valueOf());
  };

  const changeHr = (by: number) => setNewDate(m => m.add(by, 'hour'));
  const changeMin = (by: number) => setNewDate(m => m.add(by, 'minute'));

  // const setHr = (hr: number) => setNewDate(m => m.hour(hr));
  // const setMin = (min: number) => setNewDate(m => m.minute(min));

  const setRndHr = (_: number) => setNewDate(m => m.hour(Math.floor(Math.random() * 24)));
  const setRndMin = (_: number) => setNewDate(m => m.minute(Math.floor(Math.random() * 60)));

  const buttons= [
    { name: 'decHr', label: '-', onClick: changeHr, value: -1 },
    { name: 'incHr', label: '+', onClick: changeHr, value: 1 },
    { name: 'rndHr', label: 'r', onClick: setRndHr, value: 0 },
    { name: 'decMin', label: '-', onClick: changeMin, value: -1 },
    { name: 'incMin', label: '+', onClick: changeMin, value: 1 },
    { name: 'rndMin', label: 'r', onClick: setRndMin, value: 0 }
  ];

  const getCheckDataHands = (k: keyof IClockHandsJumpConfig, label: string) => ({
    name: `${k}-jump`, label, id: `chkJump_${k}`,
    checked: props.handsConfig.jump[k],
    onChange: (x: boolean) => {
      var newConfig = mergeHandsConfig(props.handsConfig, { [k]: x });
      props.stateMutators.setHandsConfig(newConfig);
    }
  });
  const getCheckData = (k: keyof IClockTicksShowConfig, label: string) => ({
    name: k, label, id: `chkShow_${k}`,
    checked: props.ticksConfig.show[k],
    onChange: (x: boolean) => {
      var newConfig = mergeTicksConfig(props.ticksConfig, { [k]: x });
      props.stateMutators.setTicksConfig(newConfig);
    }
  });
  const checks = [
    getCheckData('min5Label', 'm5'),
    getCheckData('minLabel', 'm'),
    getCheckData('minTicks', 'mt'),
    getCheckData('hourLabel', 'h'),
    getCheckData('hourTicks', 'ht'),
    getCheckDataHands('hour', 'hhj')
  ];

  return (
    <div className="clock-width button-container">
      <div>
        {checks.map(({ name, label, onChange, id, checked }) => (
          <span key={name}>
            <input type="checkbox" id={id} name={id}
              checked={checked}
              onChange={e => onChange(e.target.checked)} />
            <label className="chkLabel" htmlFor={id}>{label}</label>
          </span>
        ))}
      </div>
      <div>
        {buttons.map(({ name, label, onClick, value }) => (
          <button key={name} className={`btn btn-${name}`} onClick={() => onClick(value)}>
            <Icon path={mdiAccount}
              title="User Profile"
              size={1}
              horizontal={undefined}
              vertical={undefined}
              rotate={undefined}
              color="red"
              spin={undefined} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonsIncrements;
