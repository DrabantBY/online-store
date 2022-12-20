import type { Product } from '../../../types';
import goods from '../../../goods.json';
import { getGoodsAmountByLabels } from '../../../utils/getGoodsAmountByLabels';
import { useQueryParams } from '../../../hooks/useQueryParams';
import { useState } from 'react';

import styles from './styles.module.scss';

export const CheckBoxFilter = (props: { currentGoods: Product[]; flag: 'category' | 'brand' }) => {
  const { currentGoods, flag } = props;
  const goodsAmount = getGoodsAmountByLabels(goods, currentGoods, flag);
  const { isChecked, setQueryParams } = useQueryParams();

  return (
    <section className={styles.filter}>
      <h2 className={styles.filter__title}>Filter by {flag}</h2>
      <ul className={styles.filter__list}>
        {goodsAmount.map(([key, arr]) => (
          <li className={styles.filter__item} key={key}>
            <label>
              <input type="checkbox" checked={isChecked(flag, key)} onChange={(e) => setQueryParams(flag, key)} />
              {key}
            </label>
            <span>
              {arr[0]} | {arr[1]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
