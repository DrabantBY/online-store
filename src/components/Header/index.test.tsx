import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Header } from '.';
import '@testing-library/jest-dom/extend-expect';

test('render header title', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const title = screen.getByText(/Online Store/i);
  expect(title).toBeInTheDocument();
});
