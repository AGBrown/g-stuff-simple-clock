import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonsIncrements from './ButtonsIncrements';

const getProps = () => ({
  date: new Date(Date.now()).valueOf(),
  setDate: (date: number) => { }
});

test('todo', () => {
  const props = getProps();
  render(<ButtonsIncrements {...props} />);
  const es = screen.getAllByText(/-/i);
  es.forEach(e => expect(e).toBeInTheDocument());
});
