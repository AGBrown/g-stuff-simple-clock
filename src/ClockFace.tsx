import React from 'react';
import './App.css';

type IClockFaceProps = {
  handsConfig: IClockHandsConfig;
  date: number,
  expandTicks: boolean
  rotateHands: boolean,
  handsRotated: boolean,
}

type IClockHandsConfig = {
  jump: {
    min: boolean,
    hour: boolean
  }
}

function getDegrees(config: IClockHandsConfig, date: Date) {
  const timeValues = {
    second: date.getSeconds(),
    min: date.getMinutes(),
    hour: date.getHours()
  };
  const degrees = {
    second: timeValues.second / 60 * 360,
    min: config.jump.min
      ? timeValues.min / 60 * 360
      : (timeValues.min / 60 + timeValues.second / 60 / 60) * 360,
    hour: config.jump.hour
      ? timeValues.hour / 12 * 360
      : (timeValues.hour / 12 + timeValues.min / 60 / 12 + timeValues.second / 60 / 60 / 12) * 360,
  };
  return degrees;
};

function ClockFace(props: IClockFaceProps) {
  // format date as MMM dd
  var date = new Date(props.date);
  var displayDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  var handNames = ["second", "min", "hour"];
  var { second: sd, min: md, hour: hd } = props.expandTicks
    ? getDegrees(props.handsConfig, date)
    : { second: 0, min: 0, hour: 0 };
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

  return (
    <div className="clock">
      <div className="clock-face">
        <div className="minutes">
          {[...Array(60)]
            .map((_, i) => {
              const degrees = i / 60 * 360;
              const transform = `rotate(${degrees}deg)`;
              const transformStyles = !props.expandTicks ? {} : { transform };
              const tickClassNames = props.rotateHands && i % 5 === 0 ? ["bold"] : [];
              return { i, transformStyles, tickClassNames };
            })
            .map(x =>
            <div key={`${x.i}`}
                  className={["tick-radius", ...x.tickClassNames].join(' ')}
                  data-minute={x.i}
                  style={{ ...x.transformStyles }}>
              <div className="tickmark" />
            </div>
          )}
        </div>
        <div className="date-container">
          <p className="date">{displayDate}</p>
        </div>

        {[handsData.map(x =>
          <div key={x.name} className={["hand-container", `${x.name}-face`].join(' ')}>
            <div className={["hand", `${x.name}-hand`].join(' ')}
              style={{ ...x.transformStyles }} />
          </div>
        )]}
        <div className="center-peg"></div>
      </div>
    </div>
  );
}

export default ClockFace;
