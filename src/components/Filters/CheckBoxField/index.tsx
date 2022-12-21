import { useState } from 'react';
import { useQueryParams } from '../../../hooks/useQueryParams';
import styles from './styles.module.scss';

export const CheckBoxField = (props: { flag: string; value: string; current: number; total: number }) => {
  const { flag, value, current, total } = props;
  const { isChecked, setQueryParams } = useQueryParams();
  const [checked, setChecked] = useState(isChecked(flag, value));

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.target.checked);
    setQueryParams(flag, value);
  };

  return (
    <li className={styles.filterItem}>
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        {value}
      </label>
      <span>
        {current} | {total}
      </span>
    </li>
  );
};
