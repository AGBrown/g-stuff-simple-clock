import React from 'react';
import './App.css';
import ButtonsIncrements from './ButtonsIncrements';

function App(props: { msg: string }) {
  return (
    <div className="App">
      <header>
          {props.msg}
      </header>
      <ButtonsIncrements />
    </div>
  );
}

export default App;
