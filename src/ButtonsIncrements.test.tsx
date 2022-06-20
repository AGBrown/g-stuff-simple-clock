import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonsIncrements from './ButtonsIncrements';
import { IClockHandsConfig, IClockTicksConfig } from './types/ClockFaceTypes';

const getProps = () => ({
  date: new Date(Date.now()).valueOf(),
  setDate: (date: number) => { },
  ticksConfig: {
    show: {
      min: false,
      min5: false,
      minTicks: true,
      hour: false,
      hourTicks: false,
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
  const es = screen.getAllByText(/-/i);
  es.forEach(e => expect(e).toBeInTheDocument());
});
