import { useState, useEffect } from 'react';

import { useQueryParams } from '../../../hooks/useQueryParams';
import  './field.scss';

export const CheckBoxField = (props: { flag: string; value: string; current: number; total: number }) => {
  const { flag, value, current, total } = props;
  const { isChecked, setQueryParams } = useQueryParams();
  const initState = isChecked(flag, value);
  const [checked, setChecked] = useState(initState);

  useEffect(() => {
    setChecked(initState);
  }, [initState]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQueryParams(flag, value);
  };

  return (
    <li className='filterItem'>
      <label>
        <input className='filterItem-checkbox' type="checkbox" checked={checked} onChange={handleChange} />
        <p className='filterItem-name'>{value}</p>
      </label>
      <span className='filterItem-value'>
        {current} | {total}
      </span>
    </li>
  );
};
