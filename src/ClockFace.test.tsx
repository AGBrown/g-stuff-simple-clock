import React from 'react';
import { render, screen } from '@testing-library/react';
import ClockFace from './ClockFace';

test('renders minute marks', () => {
  const props = {
    date: new Date(Date.now()),
    expandTicks: false
  };
  render(<ClockFace {...props} />);
  [...Array(60)].forEach((_, x) => {
    const e = screen.getByText((_, e) => e?.getAttribute('data-minute') === `${x}`);
    expect(e).toBeInTheDocument();
  });
});

test('renders hand faces', () => {
  const props = {
    date: new Date(Date.now()),
    expandTicks: false
  };
  render(<ClockFace {...props} />);
  ["second", "min", "hour"].forEach(x => {
    const e = screen.getByText((_, e) => new RegExp(`${x}-face`).test(e?.getAttribute('class') ?? ""));
    expect(e).toBeInTheDocument();
  });
});

test('renders hands', () => {
  const props = {
    date: new Date(Date.now()),
    expandTicks: false
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
    date,
    expandTicks: false
  };
  render(<ClockFace {...props} />);
  ["second", "min", "hour"].forEach(x => {
    const e = screen.getByText(new RegExp(`^${displayDate}$`, 'i'));
    expect(e).toBeInTheDocument();
  });
});
