import React from 'react';
import './ClockFace.css';
import type { IClockTicksConfig, ITellsTime } from '../types/ClockFaceTypes';
import type { IClockHandsConfig } from './Hands';

type IClockFaceProps = ITellsTime & {
  handsConfig: IClockHandsConfig;
  ticksConfig: IClockTicksConfig;
  expandTicks: boolean
}

const shouldShowFactory = () => {
  const hour = (i: number, props: IClockFaceProps) => {
    return props.ticksConfig.show.hourTicks
      && props.handsConfig.rotate.isStarted
      && i % 5 === 0;
  }
  const hourLabels = (i: number, props: IClockFaceProps) => {
    return props.ticksConfig.show.hourTicks
      && props.ticksConfig.show.hourLabel
      && i % 5 === 0;
  }
  const min = (i: number, props: IClockFaceProps) => {
    return props.ticksConfig.show.minTicks
      || (hour(i, props));
  }
  const minLabels = (i: number, props: IClockFaceProps) => {
    return (props.ticksConfig.show.minLabel
        || (props.ticksConfig.show.min5Label && i % 5 === 0))
      && props.ticksConfig.show.minTicks;
  }

  return {
    ticks: {
      hour: hour,
      min: min,
    },
    labels: {
      hour: hourLabels,
      min: minLabels
    }
  }
};
const shouldShow = shouldShowFactory();

const toClassString = (...xs: string[]) => xs.join(' ');

function MinuteGraduations(props: IClockFaceProps) {

  var tickMarksData = [...Array(60)].map((_, i) => {
    const degrees = i / 60 * 360;
    const transformStyles = !props.expandTicks ? {} : {
      transform: `rotate(${degrees}deg)`
    };
    const minLabelTransformStyles = !props.expandTicks ? {} : {
      transform: `rotate(-${degrees}deg)`
    };
    const tickClassNames =
      shouldShow.ticks.hour(i, props) ? ["tick-hour"]
      : !shouldShow.ticks.min(i, props) ? ["tick-hide"]
      : [];
    const hrLabel = (i % 5 === 0) ? (i === 0 ? 12 : i / 5) : "";
    return {
      i,
      transformStyles,
      tickClassNames,
      minLabelTransformStyles,
      labels: {
        hr: hrLabel,
        min: i < 31 ? i : props.ticksConfig.show.pastTo ? 60 - i : i
      }
     };
  });

  return (
    <div className="minutes">
      {tickMarksData.map(x =>
        <div key={`${x.i}`}
              className={toClassString("tick-radius", ...x.tickClassNames)}
              style={{ ...x.transformStyles }}>
          <div className="tickmark">
            { shouldShow.labels.min(x.i, props)
                && <span className="tickmark-label label-min"
                    style={{ ...x.minLabelTransformStyles }}
                  >{x.labels.min}</span> }
            { shouldShow.labels.hour(x.i, props)
                && <span className="tickmark-label label-hour"
                    style={{ ...x.minLabelTransformStyles }}>
                    {x.labels.hr}
                  </span> }
          </div>
        </div>
      )}
    </div>
  );
}

export default MinuteGraduations;
