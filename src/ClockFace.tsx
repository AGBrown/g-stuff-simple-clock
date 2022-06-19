import React from 'react';
import './App.css';

interface IClockFaceProps {

}

function ClockFace(props: IClockFaceProps) {
  return (
    <div className="clock">
    <div className="clock-face">
      <div className="minutes">
        {[...Array(60)].map((_, i) =>
          <div className="tick-radius" data-minute={i} >
            <div className="tickmark" />
          </div>
          )}
      </div>
      <div className="date-container">
        <p className="date">JUL 31</p>
      </div>

      <div className="hand-container min-face">
        <div className="hand min-hand"></div>
      </div>
      <div className="hand-container hour-face">
        <div className="hand hour-hand"></div>
      </div>
      <div className="hand-container second-face">
        <div className="hand second-hand"></div>
      </div>
      <div className="center-peg"></div>
    </div>
    </div>
  );
}

export default ClockFace;
