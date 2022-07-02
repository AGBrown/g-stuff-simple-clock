import React from 'react';
import './Graduations.css';
import type { ITellsTime } from '../types/ClockFaceTypes';
import type { IClockGradnsConfig } from '../utils/Graduations';
import type { IClockHandsConfig } from './Hands';

type IClockFaceProps = ITellsTime & {
  handsConfig: IClockHandsConfig;
  gradnsConfig: IClockGradnsConfig;
  expandGradns: boolean
}

const shouldShowFactory = () => {
  const hour = (i: number, props: IClockFaceProps) => {
    return props.gradnsConfig.show.hourGradns
      && props.handsConfig.rotate.isStarted
      && i % 5 === 0;
  }
  const hourLabels = (i: number, props: IClockFaceProps) => {
    return props.gradnsConfig.show.hourGradns
      && props.gradnsConfig.show.hourLabel
      && i % 5 === 0;
  }
  const min = (i: number, props: IClockFaceProps) => {
    return props.gradnsConfig.show.minGradns
      || (hour(i, props));
  }
  const minLabels = (i: number, props: IClockFaceProps) => {
    return (props.gradnsConfig.show.minLabel
        || (props.gradnsConfig.show.min5Label && i % 5 === 0))
      && props.gradnsConfig.show.minGradns;
  }

  return {
    gradns: {
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

const getGradnsData = (props: IClockFaceProps) =>
  [...Array(60)].map((_, i) => {
    const degrees = i / 60 * 360;
    const transformStyles = {
      transform: props.expandGradns ? `rotate(${degrees}deg)` : undefined
    };
    const labelTransformStyles = {
      transform: props.expandGradns ? `rotate(-${degrees}deg)` : undefined
    };
    const gradnClassNamesMin = !shouldShow.gradns.min(i, props) ? ["gradn-hide"] : [];
    const gradnClassNamesHrs = shouldShow.gradns.hour(i, props) ? ["gradn-hour"] : [];
    const isHr = i % 5 === 0;
    const hrLabel = isHr ? (i === 0 ? 12 : i / 5) : "";
    return {
      i,
      transformStyles,
      gradnClassNamesMin,
      gradnClassNamesHrs,
      labelTransformStyles,
      isHr,
      labels: {
        hr: hrLabel,
        min: i < 31 ? i : props.gradnsConfig.show.pastTo ? 60 - i : i
      }
    };
  });

const toClassString = (...xs: string[]) => xs.join(' ');

function Graduations(props: IClockFaceProps) {
  const gradnsData = getGradnsData(props);

  return (
    <div className="graduations">
    {gradnsData.map(x =>
      <div key={`${x.i}`}
            className={toClassString("gradn-frame", ...x.gradnClassNamesMin)}
            style={{ ...x.transformStyles }}>
        <div className="gradn">
          { shouldShow.labels.min(x.i, props)
              && <span className="gradn-label label-min"
                  style={{ ...x.labelTransformStyles }}>
                  {x.labels.min}
                </span> }
        </div>
      </div>
    )}
    {gradnsData.filter(x => x.isHr).map(x =>
      <div key={`${x.i}`}
            className={toClassString("gradn-frame", ...x.gradnClassNamesHrs)}
            style={{ ...x.transformStyles }}>
        <div className="gradn">
          { shouldShow.labels.hour(x.i, props)
              && <span className="gradn-label label-hour"
                  style={{ ...x.labelTransformStyles }}>
                  {x.labels.hr}
                </span> }
        </div>
      </div>
    )}
    </div>
  );
}

export default Graduations;
