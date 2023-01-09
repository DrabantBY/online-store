import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';

import { useQueryParams } from '../../../hooks/useQueryParams';
import './styles.scss';

export const SearchField = () => {
  const { searchValue, setQueryParams } = useQueryParams();
  const [value, setValue] = useState(searchValue);

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setQueryParams('search', form.search.value);
  };

  return (
    <form className='form-search' onSubmit={handleSubmit}>
      <input className='form-search__input' type="search" value={value} placeholder="Search" name="search" onChange={(e) => setValue(e.target.value)} />
      <button className='form-search__button' type="submit"><BsSearch /></button>
    </form>
  );
};
