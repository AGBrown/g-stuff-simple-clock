import React from 'react';
import './Hands.css';
import { ITellsTime } from '../types/ClockFaceTypes';

function DateComplication(props: ITellsTime) {
  // format date as MMM dd
  var date = new Date(props.date);
  var displayDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  return (
    <div className="date-container clock-label-container">
      <p className="label">{displayDate}</p>
    </div>
  );
}

export default DateComplication;
