import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonsIncrements from './ButtonsIncrements';
import { IClockHandsConfig, IClockTicksConfig } from '../types/ClockFaceTypes';

const getProps = () => ({
  date: new Date(Date.now()).valueOf(),
  setDate: (date: number) => { },
  ticksConfig: {
    show: {
      min5Label: false,
      minLabel: false,
      minTicks: true,
      pastTo: false,
      hourLabel: false,
      hourTicks: false,
    }
  },
  handsConfig: {
    jump: {
      min: true,
      hour: false
    }
  },
  stateMutators: {
    setTicksConfig: (ticksConfig: IClockTicksConfig) => {},
    setHandsConfig: (handsConfig: IClockHandsConfig) => {}
  }
});

test('todo', () => {
  const props = getProps();
  render(<ButtonsIncrements {...props} />);

  const e = screen.getByText((_, e) => new RegExp('decHr').test(e?.getAttribute('id') ?? ""));
  expect(e).toBeInTheDocument();
});
