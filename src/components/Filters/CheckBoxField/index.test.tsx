import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { CheckBoxField } from '.';
import '@testing-library/jest-dom/extend-expect';

test('checkbox renders', () => {
  render(
    <MemoryRouter>
      <CheckBoxField flag="" value="" current={0} total={0} />
    </MemoryRouter>
  );

  expect(screen.getByRole('checkbox')).toBeInTheDocument();
});
