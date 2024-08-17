import React from 'react';
import { render, screen } from '@testing-library/react';
import Welcome from '../../../src/components/Welcome/index';

test('renders welcome message correctly', () => {
  const userPersonalData = {
    name: 'John Smith',
  };
  const typeOfUser = 'managed';

  render(
    <Welcome userPersonalData={userPersonalData} typeOfUser={typeOfUser} />
  );

  const welcomeMessage = screen.getByText(/Hi, John Smith 👋/i);
  expect(welcomeMessage).toBeInTheDocument();

  const quoteMessage = screen.getByText(/Manage your documents issued by SMU or track your career goal./i);
  expect(quoteMessage).toBeInTheDocument();
});