import React from 'react';
import { render, screen } from '@testing-library/react';
import type { IClockHandsProps } from './Hands';
import Hands from './Hands';

const getHandsConfig = () => ({ jump: { min: true, hour: true } });

const getHandsProps = (): IClockHandsProps => ( {
  date: new Date(Date.now()).valueOf(),
  handsConfig: getHandsConfig(),
  rotateHands: false,
  handsRotated: false
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
