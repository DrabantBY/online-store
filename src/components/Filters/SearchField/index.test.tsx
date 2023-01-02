import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchField } from '.';
import '@testing-library/jest-dom/extend-expect';

test('render placeholder text', () => {
  render(
    <MemoryRouter>
      <SearchField />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText(/Search/)).toBeInTheDocument();
});
