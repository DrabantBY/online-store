import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CopyUrl } from '.';
import '@testing-library/jest-dom/extend-expect';

test('button renders', () => {
  render(
    <MemoryRouter>
      <CopyUrl />
    </MemoryRouter>
  );

  expect(screen.getByRole('button')).toBeInTheDocument();
});
