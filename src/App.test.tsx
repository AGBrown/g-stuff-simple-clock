import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const version = `${Date.now()}`;
  const props = {
    version
  };
  render(<App {...props} />);
  const rgx = new RegExp(version, 'i');
  const linkElement = screen.getByText(rgx);
  expect(linkElement).toBeInTheDocument();
});
