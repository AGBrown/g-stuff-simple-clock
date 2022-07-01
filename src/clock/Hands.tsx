import React from 'react';
import './Hands.css';
import { ITellsTime } from '../types/ClockFaceTypes';

export type IClockHandsConfig = {
  jump: IClockHandsJumpConfig
}

export type IClockHandsJumpConfig = {
  min: boolean,
  hour: boolean
}

export type IClockHandsProps = ITellsTime & {
  handsConfig: IClockHandsConfig;
  rotateHands: boolean,
  handsRotated: boolean,
}

function getDegrees(jump: { min: boolean, hour: boolean }, date: Date) {
  const timeValues = {
    second: date.getSeconds(),
    min: date.getMinutes(),
    hour: date.getHours()
  };
  const degrees = {
    second: timeValues.second / 60 * 360,
    min: jump.min
      ? timeValues.min / 60 * 360
      : (timeValues.min / 60 + timeValues.second / 60 / 60) * 360,
    hour: jump.hour
      ? timeValues.hour / 12 * 360
      : (timeValues.hour / 12 + timeValues.min / 60 / 12 + timeValues.second / 60 / 60 / 12) * 360,
  };
  return degrees;
};

function getHandsData(props: IClockHandsProps) {
  var date = new Date(props.date);
  var handNames = ["second", "min", "hour"];
  // TODO: fix animations. Need to know old and new, and when cross the top need to add so you go above 360/below 0
  var { second: sd, min: md, hour: hd } = getDegrees(props.handsConfig.jump, date);
  var handsData = handNames.map(x => ({
    name: x,
    degrees: x === "second" ? sd : x === "min" ? md : hd
  })).map(x => ({
    name: x.name,
    transformStyles: {
      transform: props.rotateHands ? `rotate(${x.degrees}deg)` : undefined,
      transition: props.handsRotated ? "all 0.05s" : "all 2s"
    },
  }));
  return handsData;
}

function Hands(props: IClockHandsProps) {
  var handsData = getHandsData(props);
  return (
    <>
      {[handsData.map(x =>
        <div key={x.name} className={["hand-container", `${x.name}-face`].join(' ')}>
          <div className={["hand", `${x.name}-hand`].join(' ')}
            style={{ ...x.transformStyles }} />
        </div>
      )]}
      <div className="center-peg"></div>
    </>
  );
}

export default Hands;
