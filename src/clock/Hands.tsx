import React from 'react';
import './Hands.css';
import { ITellsTime } from '../types/ClockFaceTypes';

export type IClockHandsJumpConfig = {
  min: boolean,
  hour: boolean
}

export type IClockHandsRotateConfig = {
  isStarted: boolean,
  isComplete: boolean,
}

export type IClockHandsConfig = {
  jump: IClockHandsJumpConfig
  rotate: IClockHandsRotateConfig
}

export type IClockHandsProps = ITellsTime & {
  handsConfig: IClockHandsConfig;
}

const mergeHandsJumpConfig = (
  config: IClockHandsConfig,
  newConfig: Partial<IClockHandsJumpConfig>) => {
  return {
    ...config,
    jump: {
      ...config.jump,
      ...newConfig
    }
  };
};

const mergeHandsRotateConfig = (
  config: IClockHandsConfig,
  newConfig: Partial<IClockHandsRotateConfig>) => {
  return {
    ...config,
    rotate: {
      ...config.rotate,
      ...newConfig
    }
  };
};

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

function getHandsData({ date, handsConfig }: IClockHandsProps) {
  var dateTime = new Date(date);
  var handNames = ["second", "min", "hour"];
  // TODO: fix animations. Need to know old and new, and when cross the top need to add so you go above 360/below 0
  var { second: sd, min: md, hour: hd } = getDegrees(handsConfig.jump, dateTime);
  var handsData = handNames.map(x => ({
    name: x,
    degrees: x === "second" ? sd : x === "min" ? md : hd
  })).map(x => ({
    name: x.name,
    transformStyles: {
      transform: handsConfig.rotate.isStarted ? `rotate(${x.degrees}deg)` : undefined,
      transition: handsConfig.rotate.isComplete ? "all 0.05s" : "all 2s"
    },
    faceClassName: toClassString("hand-container", `${x.name}-face`),
    handClassName: toClassString("hand", `${x.name}-hand`)
  }));
  return handsData;
}

const toClassString = (...xs: string[]) => xs.join(' ');

function Hands(props: IClockHandsProps) {
  var handsData = getHandsData(props);
  return (
    <>
      {[handsData.map(x =>
        <div key={x.name} className={x.faceClassName}>
          <div className={x.handClassName}
            style={{ ...x.transformStyles }} />
        </div>
      )]}
      <div className="center-peg"></div>
    </>
  );
}

export default Hands;

export {
  mergeHandsJumpConfig,
  mergeHandsRotateConfig
}
