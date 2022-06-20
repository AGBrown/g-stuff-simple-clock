import React from 'react';
import moment from 'moment';
import './App.css';

type IButtonsIncrementsProps = {
  date: number,
  setDate: (date: number) => void;
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

  return (
    <div className="clock-width">
      {buttons.map(({ name, label, onClick, value }) => (
        <button key={name} className={`btn btn-${name}`} onClick={() => onClick(value)}>
          {label}
        </button>
      ))}
    </div>
  );
}

export default ButtonsIncrements;
