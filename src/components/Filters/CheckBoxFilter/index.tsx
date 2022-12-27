import type { Product } from '../../../types';
import goods from '../../../goods.json';
import { getGoodsAmountByLabels } from '../../../utils/getGoodsAmountByLabels';
import { CheckBoxField } from '../CheckBoxField';
import './styles.scss';

export const CheckBoxFilter = (props: { currentGoods: Product[]; flag: 'category' | 'brand' }) => {
  const { currentGoods, flag } = props;
  const goodsAmount = getGoodsAmountByLabels(goods, currentGoods, flag);

  return (
    <section className='filter'>
      <h2 className='filter-title'>Filter by {flag}</h2>
      <ul className='filter-list'>
        {goodsAmount.map(([key, arr]) => (
          <CheckBoxField key={key} flag={flag} value={key} current={arr[0]} total={arr[1]} />
        ))}
      </ul>
    </section>
  );
};
