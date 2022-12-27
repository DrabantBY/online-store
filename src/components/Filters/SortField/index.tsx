import { useState, useEffect } from 'react';
import { useQueryParams } from '../../../hooks/useQueryParams';
import './styles.scss';

export const SortField = () => {
  const { sortValue, setQueryParams } = useQueryParams();
  const [select, setSelect] = useState(sortValue);

  useEffect(() => {
    setSelect(sortValue);
  }, [sortValue]);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;
    setQueryParams('sort', value);
  };

  return (
    <select className='sort-field-select' name="sort" onChange={handleChange} value={select}>
      <option value="">Default sorting</option>
      <option value="rating-asc">Asc by rating</option>
      <option value="rating-desc">Desc by rating</option>
      <option value="price-asc">Low to High</option>
      <option value="price-desc">High to Low</option>
    </select>
  );
};
