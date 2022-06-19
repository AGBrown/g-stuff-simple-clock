import React from 'react';
import './App.css';

interface IClockFaceProps {

}

function ClockFace(props: IClockFaceProps) {
  var hands = ["second", "min", "hour"];
  return (
    <div className="clock">
    <div className="clock-face">
      <div className="minutes">
        {[...Array(60)].map((_, i) =>
          <div key={`${i}`} className="tick-radius" data-minute={i} >
            <div className="tickmark" />
          </div>
        )}
      </div>
      <div className="date-container">
        <p className="date">JUL 31</p>
      </div>

      {[hands.map(x =>
        <div key={x} className={["hand-container", `${x}-face`].join(' ')}>
          <div className={["hand", `${x}-hand`].join(' ')}></div>
        </div>
      )]}
      <div className="center-peg"></div>
    </div>
    </div>
  );
}

export default ClockFace;
