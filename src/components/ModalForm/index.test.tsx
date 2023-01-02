import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ModalForm } from '.';
import '@testing-library/jest-dom/extend-expect';

test('button renders', () => {
  render(
    <MemoryRouter>
      <ModalForm
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </MemoryRouter>
  );

  expect(screen.getByRole('button')).toBeInTheDocument();
});
