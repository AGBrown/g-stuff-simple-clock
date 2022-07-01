import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonsIncrements from './ButtonsIncrements';
import type { IClockGradnsConfig } from '../types/ClockFaceTypes';
import type { IClockHandsConfig } from '../clock/Hands'

const getProps = () => ({
  date: new Date(Date.now()).valueOf(),
  setDate: (date: number) => { },
  gradnsConfig: {
    show: {
      min5Label: false,
      minLabel: false,
      minGradns: true,
      pastTo: false,
      hourLabel: false,
      hourGradns: false,
    }
  } as IClockGradnsConfig,
  handsConfig: {
    jump: {
      min: true,
      hour: false
    },
    rotate: {
      isStarted: false,
      isComplete: false
    }
  } as IClockHandsConfig,
  stateMutators: {
    setGradnsConfig: (gradnsConfig: IClockGradnsConfig) => {},
    setHandsConfig: (handsConfig: IClockHandsConfig) => {}
  }
});

test('todo', () => {
  const props = getProps();
  render(<ButtonsIncrements {...props} />);

  const e = screen.getByText((_, e) => new RegExp('decHr').test(e?.getAttribute('id') ?? ""));
  expect(e).toBeInTheDocument();
});
