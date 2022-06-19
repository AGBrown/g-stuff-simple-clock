import React from 'react';
import { render, screen } from '@testing-library/react';
import ClockFace from './ClockFace';

test('renders minute marks', () => {
  const props = {
  };
  render(<ClockFace {...props} />);
  [...Array(60)].forEach((_, x) => {
    const e = screen.getByText((_, e) => e?.getAttribute('data-minute') === `${x}`);
    expect(e).toBeInTheDocument();
  });
});

test('renders hand faces', () => {
  const props = {
  };
  render(<ClockFace {...props} />);
  ["second", "min", "hour"].forEach(x => {
    const e = screen.getByText((_, e) => new RegExp(`${x}-face`).test(e?.getAttribute('class') ?? ""));
    expect(e).toBeInTheDocument();
  });
});

test('renders hands', () => {
  const props = {
  };
  render(<ClockFace {...props} />);
  ["second", "min", "hour"].forEach(x => {
    const e = screen.getByText((_, e) => new RegExp(`${x}-hand`).test(e?.getAttribute('class') ?? ""));
    expect(e).toBeInTheDocument();
  });
});
