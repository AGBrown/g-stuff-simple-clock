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
