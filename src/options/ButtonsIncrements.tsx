import React from 'react';
import moment from 'moment';
import './ButtonsIncrements.css';
import type { IClockHandsJumpConfig } from '../clock/Hands';
import type { IClockGradnsConfig, IClockGradnsShowConfig } from '../utils/Graduations';
import * as graduationsUtils from '../utils/Graduations';
import type { IClockHandsConfig } from '../clock/Hands'
import { mergeHandsJumpConfig } from '../clock/Hands'
import Icon from '@mdi/react';
import { mdiPlus, mdiMinus, mdiAxisXRotateClockwise } from '@mdi/js';

type IButtonsIncrementsProps = {
  date: number;
  setDate: (date: number) => void;
  gradnsConfig: IClockGradnsConfig;
  handsConfig: IClockHandsConfig;
  stateMutators: {
    setGradnsConfig: (gradnsConfig: IClockGradnsConfig) => void;
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

  const ic = {
    '-': <Icon path={mdiMinus} size={1} />,
    '+': <Icon path={mdiPlus} size={1} />,
    'r': <Icon path={mdiAxisXRotateClockwise} size={1} />,
  }
  type icKeys = keyof typeof ic;
  const buttons= [
    { name: 'decHr', label: '-' as icKeys, onClick: changeHr, value: -1 },
    { name: 'incHr', label: '+' as icKeys, onClick: changeHr, value: 1 },
    { name: 'rndHr', label: 'r' as icKeys, onClick: setRndHr, value: 0 },
    { name: 'decMin', label: '-' as icKeys, onClick: changeMin, value: -1 },
    { name: 'incMin', label: '+' as icKeys, onClick: changeMin, value: 1 },
    { name: 'rndMin', label: 'r' as icKeys, onClick: setRndMin, value: 0 }
  ];

  const getCheckDataHands = (k: keyof IClockHandsJumpConfig, label: string) => ({
    name: `${k}-jump`, label, id: `chkJump_${k}`,
    checked: props.handsConfig.jump[k],
    onChange: (x: boolean) => {
      var newConfig = mergeHandsJumpConfig(props.handsConfig, { [k]: x } );
      props.stateMutators.setHandsConfig(newConfig);
    }
  });
  const getCheckData = (k: keyof IClockGradnsShowConfig, label: string) => ({
    name: k, label, id: `chkShow_${k}`,
    checked: props.gradnsConfig.show[k],
    onChange: (x: boolean) => {
      var newConfig = graduationsUtils.merge(props.gradnsConfig, { [k]: x });
      props.stateMutators.setGradnsConfig(newConfig);
    }
  });
  const checks = [
    getCheckData('min5Label', 'm5'),
    getCheckData('minLabel', 'm'),
    getCheckData('minGradns', 'mt'),
    getCheckData('pastTo', 'p/t'),
    getCheckData('hourLabel', 'h'),
    getCheckData('hourGradns', 'ht'),
    getCheckDataHands('hour', 'hhj')
  ];

  return (
    <div className="button-container">
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
          <button key={name} id={name} className={`btn btn-${name}`} onClick={() => onClick(value)}>
            {ic[label]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonsIncrements;
