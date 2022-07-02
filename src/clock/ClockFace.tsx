import React from 'react';
import './ClockFace.css';
import type { IClockFaceProps } from '../types/ClockFaceTypes';
import Hands from './Hands';
import DateComplication from './DateComplication';
import Graduations from './Graduations';

function ClockFace(props: IClockFaceProps) {

  const showPastTo = props.gradnsConfig.show.pastTo && props.gradnsConfig.show.minGradns;
  const cnClockFace = showPastTo ? ['past-to-bg'] : [];

  return (
    <div className="clock">
      <div className={["clock-face", ...cnClockFace].join(' ')}>
        <Graduations {...props} />

        {showPastTo && (
          <>
            <div className="past-container clock-label-container">
              <p className="label">past</p>
            </div>
            <div className="to-container clock-label-container">
              <p className="label">to</p>
            </div>
          </>
        )}

        <DateComplication {...props} />
        <Hands {...props} />
      </div>
    </div>
  );
}

export default ClockFace;
