import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Login} from '../../../src/pages';

test('renders login page with correct options', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const managedUserLink = screen.getByText('Managed User').closest('a');
  const personalUserLink = screen.getByText('Personal User').closest('a');

  expect(managedUserLink).toBeInTheDocument();
  expect(personalUserLink).toBeInTheDocument();

  expect(managedUserLink.getAttribute('href')).toBe('/managed');
  expect(personalUserLink.getAttribute('href')).toBe('/personal');
});

test('renders login page with correct header', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const header = screen.getByText('Select User to Login');

  expect(header).toBeInTheDocument();
});