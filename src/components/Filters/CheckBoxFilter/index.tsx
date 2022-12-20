import type { Product } from '../../../types';
import goods from '../../../goods.json';
import { getGoodsAmountByLabels } from '../../../utils/getGoodsAmountByLabels';
import { useQueryParams } from '../../../hooks/useQueryParams';

import styles from './styles.module.scss';

export const CheckBoxFilter = (props: { currentGoods: Product[]; flag: 'category' | 'brand' }) => {
  const { currentGoods, flag } = props;
  const goodsAmount = getGoodsAmountByLabels(goods, currentGoods, flag);
  const { setQueryParams } = useQueryParams();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, checked } = e.target;

    setQueryParams(flag, value);
  };

  return (
    <section className={styles.filter}>
      <h2 className={styles.filter__title}>Filter by {flag}</h2>
      <ul className={styles.filter__list}>
        {goodsAmount.map(([key, value]) => (
          <li className={styles.filter__item} key={key}>
            <label>
              <input type="checkbox" value={key} onChange={handleChange} />
              {key}
            </label>
            <span>
              {value[0]} | {value[1]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
