import React, { useEffect } from 'react';
import { motion, useMotionValue } from "framer-motion"
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

import './Graduations.css';
import type { IClockFaceProps } from '../types/ClockFaceTypes';
import type { Action } from '../types/common';
import { IClockGradnsConfig, IClockGradnsShowConfig } from '../utils/Graduations';

const shouldShowFactory = () => {
  const hour = (i: number, show: IClockGradnsShowConfig, showHrsAfterOpen: boolean) => {
    return show.hourGradns && showHrsAfterOpen
      && i % 5 === 0;
  }
  const hourLabels = (i: number, show: IClockGradnsShowConfig) => {
    return show.hourGradns
      && show.hourLabel
      && i % 5 === 0;
  }
  const min = (i: number, show: IClockGradnsShowConfig) => {
    return show.minGradns;
  }
  const minLabels = (i: number, show: IClockGradnsShowConfig) => {
    return (show.minLabel
        || (show.min5Label && i % 5 === 0))
      && show.minGradns;
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
    props: IGraduationsProps,
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
      animate: { rotate: -1 * degrees },
      transition: { duration: 0 },
      style: { originX: 0.5, originY: 0.5 },
    };
    const gradnClassNamesMin = shouldShow.gradns.min(i, props.gradnsConfig.show) ?
      ["gradn-min"] : ["gradn-hide"];
    const gradnClassNamesHrs = shouldShow.gradns.hour(i, props.gradnsConfig.show, props.showHrsAfterOpen) ?
      ["gradn-hour"] : ["gradn-hide"];
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

enum OpeningAnimationMachineStates {
  closed = "closed",
  opening = "opening",
  open = "open"
}

enum OpeningAnimationMachineEvents {
  OPEN = "OPEN",
  DONE = "DONE",
}

const openingAnimationMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOkwBsB7WSAYgHkAFAUQDlFQAHa3AF10r4OIAB6IAtACYAbAEYSkgMyyA7AA4ALAAY1AVhUaNATgA0IAJ4TZqkvsm7dkldckbpOgL4ezaLHkKklJxg+ARQtBCCYCQEAG6UANbRvjgExCRBIWEIcZSY6PyCANpaALrC3LB8AkJIooi6RiSKitJGRm2qWrrSKrpmlgji1iq2KvaOzrKu7mpe3iD4lBBwwin+6RTUkBU8hbWgYkOKHSTSPWpaGrJGsmrS0m4DVkq2Rn3a9tc9t14+GKkAhlgqF8FBdlV9sIjsNHiQjIZJLdJPY1EoVM8hrJjCQ7jddCc1AYtM4-iB1mlAiCIdVBNDEK4mvcbkZJHpHBpnBpMcNXo0PlovrIfmSKQEaVC6jCNJItGcLlcbncHk8LBIUZJcX0HipHtjrLJ5h4gA */
  createMachine({
    id: "(machine)",
    initial: OpeningAnimationMachineStates.closed,
    states: {
      [OpeningAnimationMachineStates.closed]: {
        on: {
          [OpeningAnimationMachineEvents.OPEN]: {
            target: OpeningAnimationMachineStates.opening,
          },
        },
      },
      [OpeningAnimationMachineStates.opening]: {
        on: {
          [OpeningAnimationMachineEvents.DONE]: {
            target: OpeningAnimationMachineStates.open,
          }
        },
      },
      [OpeningAnimationMachineStates.open]: {
        type: "final"
      },
    },
  });

type IGraduationsProps = {
  setState: Action<string>,
  expandGradns: boolean,
  showHrsAfterOpen: boolean,
  gradnsConfig: IClockGradnsConfig
};

const pickGraduationsProps = (props: IClockFaceProps): IGraduationsProps => {
  const {
    setState,
    expandGradns,
    gradnsConfig,
    handsConfig
  } = props;
  return {
    setState,
    expandGradns,
    gradnsConfig,
    showHrsAfterOpen: handsConfig.rotate.isStarted
  }
}

export {
  pickGraduationsProps
}

function Graduations(props: IGraduationsProps) {
  const [openState, openSend, openService] = useMachine(openingAnimationMachine, { devTools: false });
  const { setState, expandGradns } = props;

  useEffect(() => {
    const subscription = openService.subscribe((state) => {
      // TODO: if state matches 'open' then enable buttons, use the state prop for that.
      console.log(state.value);
      setState(state as unknown as string);
    });

    return subscription.unsubscribe;
  }, [openService, setState]);

  useEffect(() => {
    if (expandGradns) openSend(OpeningAnimationMachineEvents.OPEN);
  }, [expandGradns, openSend]);

  const gradnsData = getGradnsData(
    props,
    openState.matches(OpeningAnimationMachineStates.opening),
    () => openSend(OpeningAnimationMachineEvents.DONE)
  );
  const y = useMotionValue(0);

  return (
    <div className="graduations">
    {gradnsData.map(x =>
      <motion.div key={`${x.i}`}
            className={toClassString("gradn-frame", ...x.gradnClassNamesMin)}
            { ...x.transformStyles }>
        <div className="gradn">
          { shouldShow.labels.min(x.i, props.gradnsConfig.show)
              && <motion.span className="gradn-label label-min"
                  { ...x.labelTransformStyles }>
                  {x.labels.min}
                </motion.span> }
        </div>
      </motion.div>
    )}
    {gradnsData.filter(x => x.isHr).map(x =>
      <motion.div key={`${x.i}`}
            className={toClassString("gradn-frame", ...x.gradnClassNamesHrs)}
            { ...x.transformStyles }>
        <motion.div className="gradn"
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 20,
          }}
          style={{ y }}
          >
          { shouldShow.labels.hour(x.i, props.gradnsConfig.show)
              && <motion.span className="gradn-label label-hour"
                  { ...x.labelTransformStyles }>
                  {x.labels.hr}
                </motion.span> }
        </motion.div>
      </motion.div>
    )}
    </div>
  );
}

export default Graduations;

