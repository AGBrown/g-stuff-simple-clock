import React, { useEffect } from 'react';
import { motion } from "framer-motion"
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

import './Graduations.css';
import type { IClockFaceProps } from '../types/ClockFaceTypes';

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

const getGradnsData = (
    props: IClockFaceProps,
    startOpening: boolean,
    onAnimationComplete: () => void
  ) =>
  [...Array(60)].map((_, i) => {
    const degrees = i / 60 * 360;
    const transformStyles = {
      animate: { rotate: degrees },
      transition: { duration: 2 },
      style: { originX: 0.5, originY: 1 },
      onAnimationComplete: i === 59 ? onAnimationComplete : undefined
    };
    const labelTransformStyles = {
      transform: startOpening ? `rotate(-${degrees}deg)` : undefined
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

const openingAnimationMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOkwBsB7WSAYgHkAFAUQDlFQAHa3AF10r4OIAB6IAtACYAbAEYSkgMyyA7AA4ALAAY1AVhUaNATgA0IAJ4TZqkvsm7dkldckbpOgL4ezaLHkKklJxg+ARQtBCCYCQEAG6UANbRvjgExCRBIWEIcZSY6PyCANpaALrC3LB8AkJIooi6RiSKitJGRm2qWrrSKrpmlgji1iq2KvaOzrKu7mpe3iD4lBBwwin+6RTUkBU8hbWgYkOKHSTSPWpaGrJGsmrS0m4DVkq2Rn3a9tc9t14+GKkAhlgqF8FBdlV9sIjsNHiQjIZJLdJPY1EoVM8hrJjCQ7jddCc1AYtM4-iB1mlAiCIdVBNDEK4mvcbkZJHpHBpnBpMcNXo0PlovrIfmSKQEaVC6jCNJItGcLlcbncHk8LBIUZJcX0HipHtjrLJ5h4gA */
  createMachine({
    id: "(machine)",
    initial: "closed",
    states: {
      closed: {
        on: {
          OPEN: {
            target: "opening",
          },
        },
      },
      opening: {
        on: {
          DONE: {
            target: "open",
          }
        },
      },
      open: {
        type: "final"
      },
    },
  });

function Graduations(props: IClockFaceProps) {
  const [openState, openSend, openService] = useMachine(openingAnimationMachine, { devTools: false });
  const { setState, expandGradns } = props;

  useEffect(() => {
    const subscription = openService.subscribe((state) => {
      console.log(state.value);
      setState(state as unknown as string);
    });

    return subscription.unsubscribe;
  }, [openService, setState]);

  useEffect(() => {
    if (expandGradns) openSend("OPEN");
  }, [expandGradns, openSend]);

  const startOpening = openState.matches('opening');
  const onAnimationComplete = () => openSend('DONE');
  const gradnsData = getGradnsData(props, startOpening, onAnimationComplete);

  return (
    <div className="graduations">
    {gradnsData.map(x =>
      <motion.div key={`${x.i}`}
            className={toClassString("gradn-frame", ...x.gradnClassNamesMin)}
            { ...x.transformStyles }>
        <div className="gradn">
          { shouldShow.labels.min(x.i, props)
              && <span className="gradn-label label-min"
                  style={{ ...x.labelTransformStyles }}>
                  {x.labels.min}
                </span> }
        </div>
      </motion.div>
    )}
    {gradnsData.filter(x => x.isHr).map(x =>
      <motion.div key={`${x.i}`}
            className={toClassString("gradn-frame", ...x.gradnClassNamesHrs)}
            { ...x.transformStyles }>
        <div className="gradn">
          { shouldShow.labels.hour(x.i, props)
              && <span className="gradn-label label-hour"
                  style={{ ...x.labelTransformStyles }}>
                  {x.labels.hr}
                </span> }
        </div>
      </motion.div>
    )}
    </div>
  );
}

export default Graduations;
