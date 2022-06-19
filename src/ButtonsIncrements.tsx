import React from 'react';
import './App.css';

interface IButtonsIncrementsProps {

}

function ButtonsIncrements(props: IButtonsIncrementsProps) {
  return (
    <div className="clock-width">
      <button type="button" id="decHr">-</button>
      <button type="button" id="incHr">+</button>
      <button type="button" id="rndHr">r</button>
      <button type="button" id="decMin">-</button>
      <button type="button" id="incMin">+</button>
      <button type="button" id="rndMin">r</button>
    </div>
  );
}

export default ButtonsIncrements;
