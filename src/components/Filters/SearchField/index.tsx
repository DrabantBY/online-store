import { useQueryParams } from '../../../hooks/useQueryParams';
import { useState } from 'react';

import styles from './styles.module.scss';

export const SearchField = () => {
  const { searchValue, setQueryParams } = useQueryParams();
  const [value, setValue] = useState(searchValue);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setQueryParams('search', form.search.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="search" value={value} name="search" onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
};
