import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ViewToggler } from '.';
import '@testing-library/jest-dom/extend-expect';

test('button renders', () => {
  render(
    <MemoryRouter>
      <ViewToggler />
    </MemoryRouter>
  );

  expect(screen.getByRole('button')).toBeInTheDocument();
});
