import React from 'react';
import { render } from '@testing-library/react';
import Card from '../../../src/components/Card/index';

test('renders card component with children', () => {
  const { getByText } = render(
    <Card>
      <p>Card Content</p>
    </Card>
  );

  const cardElement = getByText('Card Content');
  expect(cardElement).toBeInTheDocument();
});