import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SortField } from '.';
import '@testing-library/jest-dom/extend-expect';

test('options correct number', () => {
  render(
    <MemoryRouter>
      <SortField />
    </MemoryRouter>
  );

  expect(screen.getAllByRole('option').length).toBe(5);
});
