import React, { useEffect } from 'react';
import './App.css';
import ButtonsIncrements from './ButtonsIncrements';
import ClockFace from './ClockFace';

function App(props: { msg: string }) {
  var date = new Date(Date.now());
  var dateProps = { date };

  useEffect(() => {
    console.log("App.tsx: useEffect()");
  }, []);

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
