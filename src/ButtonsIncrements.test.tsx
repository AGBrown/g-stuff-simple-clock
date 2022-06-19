import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonsIncrements from './ButtonsIncrements';

test('todo', () => {
  const props = {
  };
  render(<ButtonsIncrements {...props} />);
  const es = screen.getAllByText(/-/i);
  es.forEach(e => expect(e).toBeInTheDocument());
});
