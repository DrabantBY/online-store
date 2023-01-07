import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Footer } from '.';
import '@testing-library/jest-dom/extend-expect';

test('render footer text', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  const title = screen.getByText(/Online Store 2023/i);
  expect(title).toBeInTheDocument();
});
