import React from 'react';
import { render, screen } from '@testing-library/react';
import type { IClockHandsConfig, IClockHandsProps } from './Hands';
import Hands from './Hands';

const getHandsProps = (): IClockHandsProps => ({
  date: new Date(Date.now()).valueOf(),
  handsConfig: {
    jump: { min: true, hour: true },
    rotate: {
      isStarted: false,
      isComplete: false
    }
  },
});

test('renders hand faces', () => {
  const props = getHandsProps();
  render(<Hands {...props} />);
  ["second", "min", "hour"].forEach(x => {
    const e = screen.getByText((_, e) => new RegExp(`${x}-face`).test(e?.getAttribute('class') ?? ""));
    expect(e).toBeInTheDocument();
  });
});

test('renders hands', () => {
  const props = getHandsProps();
  render(<Hands {...props} />);
  ["second", "min", "hour"].forEach(x => {
    const e = screen.getByText((_, e) => new RegExp(`${x}-hand`).test(e?.getAttribute('class') ?? ""));
    expect(e).toBeInTheDocument();
  });
});
