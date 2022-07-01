import React from 'react';
import './MinuteGraduations.css';
import type { IClockGradnsConfig, ITellsTime } from '../types/ClockFaceTypes';
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

const toClassString = (...xs: string[]) => xs.join(' ');

function MinuteGraduations(props: IClockFaceProps) {

  var gradnsData = [...Array(60)].map((_, i) => {
    const degrees = i / 60 * 360;
    const transformStyles = !props.expandGradns ? {} : {
      transform: `rotate(${degrees}deg)`
    };
    const minLabelTransformStyles = !props.expandGradns ? {} : {
      transform: `rotate(-${degrees}deg)`
    };
    const gradnClassNames =
      shouldShow.gradns.hour(i, props) ? ["gradn-hour"]
      : !shouldShow.gradns.min(i, props) ? ["gradn-hide"]
      : [];
    const hrLabel = (i % 5 === 0) ? (i === 0 ? 12 : i / 5) : "";
    return {
      i,
      transformStyles,
      gradnClassNames,
      minLabelTransformStyles,
      labels: {
        hr: hrLabel,
        min: i < 31 ? i : props.gradnsConfig.show.pastTo ? 60 - i : i
      }
     };
  });

  return (
    <div className="graduations">
      {gradnsData.map(x =>
        <div key={`${x.i}`}
              className={toClassString("gradn-frame", ...x.gradnClassNames)}
              style={{ ...x.transformStyles }}>
          <div className="gradnmark">
            { shouldShow.labels.min(x.i, props)
                && <span className="gradnmark-label label-min"
                    style={{ ...x.minLabelTransformStyles }}
                  >{x.labels.min}</span> }
            { shouldShow.labels.hour(x.i, props)
                && <span className="gradnmark-label label-hour"
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
