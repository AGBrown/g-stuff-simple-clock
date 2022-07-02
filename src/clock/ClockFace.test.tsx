import React from 'react';
import { render, screen } from '@testing-library/react';
import ClockFace from './ClockFace';

const getHandsConfig = () => ({
  jump: { min: true, hour: true },
  rotate: {
    isStarted: false,
    isComplete: false
  }
});

const getGradnsConfig = () => ({
  show: {
    min5Label: true,
    minLabel: true,
    minGradns: true,
    pastTo: false,
    hourLabel: true,
    hourGradns: true
  }
});

const getClockProps = () => ( {
  state: '',
  handsConfig: getHandsConfig(),
  gradnsConfig: getGradnsConfig(),
  date: new Date(Date.now()).valueOf(),
  expandGradns: false,
});

test('renders minute marks', () => {
  const props = {
    ...getClockProps()
  };
  render(<ClockFace {...props} />);
  [...Array(60)].forEach((_, x) => {
    const es = screen.getAllByText((_, e) => new RegExp(`gradn-frame`).test(e?.getAttribute('class') ?? ""));
    expect(es[0]).toBeInTheDocument();
  });
});

test('renders hand faces', () => {
  const props = {
    ...getClockProps()
  };
  render(<ClockFace {...props} />);
  ["second", "min", "hour"].forEach(x => {
    const e = screen.getByText((_, e) => new RegExp(`${x}-face`).test(e?.getAttribute('class') ?? ""));
    expect(e).toBeInTheDocument();
  });
});

test('renders hands', () => {
  const props = {
    ...getClockProps()
  };
  render(<ClockFace {...props} />);
  ["second", "min", "hour"].forEach(x => {
    const e = screen.getByText((_, e) => new RegExp(`${x}-hand`).test(e?.getAttribute('class') ?? ""));
    expect(e).toBeInTheDocument();
  });
});

test('renders the date', () => {
  const date = new Date(Date.now());
  // get test date in MMM dd format
  const displayDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  const props = {
    ...getClockProps()
  };
  render(<ClockFace {...props} />);
  ["second", "min", "hour"].forEach(x => {
    const e = screen.getByText(new RegExp(`^${displayDate}$`, 'i'));
    expect(e).toBeInTheDocument();
  });
});
