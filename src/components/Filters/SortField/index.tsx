import { useState } from 'react';
import { useQueryParams } from '../../../hooks/useQueryParams';
import styles from './styles.module.scss';

export const SortField = () => {
  const { sortValue, setQueryParams } = useQueryParams();
  const [select, setSelect] = useState(sortValue);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;
    setSelect(value);
    setQueryParams('sort', value);
  };

  return (
    <select name="sort" onChange={handleChange} value={select}>
      <option value="">--- sort option ---</option>
      <option value="rating-asc">sort asc by rating</option>
      <option value="rating-desc">sort desc by rating</option>
      <option value="price-asc">sort asc by price</option>
      <option value="price-desc">sort desc by price</option>
    </select>
  );
};
