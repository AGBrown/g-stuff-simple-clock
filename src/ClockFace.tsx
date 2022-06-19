import React from 'react';
import './App.css';

interface IClockFaceProps {
  date: Date,
  expandTicks: boolean
}

function ClockFace(props: IClockFaceProps) {
  var hands = ["second", "min", "hour"];
  // format date as MMM dd
  var displayDate = props.date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  return (
    <div className="clock">
    <div className="clock-face">
      <div className="minutes">
        {[...Array(60)]
          .map((_, i) => {
            const degrees = i / 60 * 360;
            const transform = `rotate(${degrees}deg)`;
            var transformStyles = !props.expandTicks ? {} : { transform };
            return { i, transformStyles };
          })
          .map(x =>
          <div key={`${x.i}`} className="tick-radius" data-minute={x.i}
            style={{ ...x.transformStyles }}>
            <div className="tickmark" />
          </div>
        )}
      </div>
      <div className="date-container">
        <p className="date">{displayDate}</p>
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
