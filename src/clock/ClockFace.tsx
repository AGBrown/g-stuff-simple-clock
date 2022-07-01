import React from 'react';
import './ClockFace.css';
import type { IClockTicksConfig, ITellsTime } from '../types/ClockFaceTypes';
import type { IClockHandsConfig } from './Hands';
import Hands from './Hands';
import DateComplication from './DateComplication';
import MinuteGraduations from './MinuteGraduations';

type IClockFaceProps = ITellsTime & {
  handsConfig: IClockHandsConfig;
  ticksConfig: IClockTicksConfig;
  expandTicks: boolean
}

function ClockFace(props: IClockFaceProps) {

  const showPastTo = props.ticksConfig.show.pastTo && props.ticksConfig.show.minTicks;
  const cnClockFace = showPastTo ? ['past-to-bg'] : [];

  return (
    <div className="clock">
      <div className={["clock-face", ...cnClockFace].join(' ')}>
        <MinuteGraduations {...props} />

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
