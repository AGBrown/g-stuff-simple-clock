import React from 'react';
import moment from 'moment';
import './ButtonsIncrements.css';
import { IClockTicksConfig, IClockHandsConfig, IClockTicksShowConfig } from './types/ClockFaceTypes';

type IButtonsIncrementsProps = {
  date: number;
  setDate: (date: number) => void;
  ticksConfig: IClockTicksConfig;
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

  const setHr = (hr: number) => setNewDate(m => m.hour(hr));
  const setMin = (min: number) => setNewDate(m => m.minute(min));

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

  const updateTicksConfig = (newConfig: Partial<IClockTicksShowConfig>) => {
    props.stateMutators.setTicksConfig({
      ...props.ticksConfig,
      show: {
        ...props.ticksConfig.show,
        ...newConfig
      }
    });
  };
  const checks= [
    {
      name: 'min', label: 'm', id: "chkShowMinLabels",
      checked: props.ticksConfig.show.min,
      onClick: updateTicksConfig,
      value: (newValue: boolean) => ({ min: newValue })
    },
    {
      name: 'min5', label: 'm5', id: "chkShowMin5Labels",
      checked: props.ticksConfig.show.min5,
      onClick: updateTicksConfig,
      value: (newValue: boolean) => ({ min5: newValue })
    },
    {
      name: 'hour', label: 'h', id: "chkShowHrLabels",
      checked: props.ticksConfig.show.hour,
      onClick: updateTicksConfig,
      value: (newValue: boolean) => ({ hour: newValue })
    },
    {
      name: 'hourTicks', label: 'ht', id: "chkShowHrTicks",
      checked: props.ticksConfig.show.hourTicks,
      onClick: updateTicksConfig,
      value: (newValue: boolean) => ({ hourTicks: newValue })
    }
  ];

  return (
    <div className="clock-width button-container">
      <div>
        {checks.map(({ name, label, onClick, value, id, checked }) => (
          <span key={name}>
            <input type="checkbox" id={id} name={id}
              checked={checked}
              onChange={e => onClick(value(e.target.checked))} />
            <label className="chkLabel" htmlFor={id}>{label}</label>
          </span>
        ))}
      </div>
      <div>
        {buttons.map(({ name, label, onClick, value }) => (
          <button key={name} className={`btn btn-${name}`} onClick={() => onClick(value)}>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonsIncrements;
