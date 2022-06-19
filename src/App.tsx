import React from 'react';
import './App.css';
import ButtonsIncrements from './ButtonsIncrements';
import ClockFace from './ClockFace';

function App(props: { msg: string }) {
  var date = new Date(Date.now());
  var dateProps = { date };
  return (
    <div className="App">
      <header>
          {props.msg}
      </header>
      <ButtonsIncrements />
      <ClockFace { ...dateProps } />
    </div>
  );
}

export default App;
