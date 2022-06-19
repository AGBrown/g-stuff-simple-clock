import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const msg = `${Date.now()}`;
  const props = {
    msg
  };
  render(<App {...props} />);
  const rgx = new RegExp(msg, 'i');
  const linkElement = screen.getByText(rgx);
  expect(linkElement).toBeInTheDocument();
});
