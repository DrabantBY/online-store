import { ArticleList } from '../ArticleList';
import { CheckBoxFilter } from '../Filters/CheckBoxFilter';
import goods from '../../goods.json';
import { useQueryParams } from '../../hooks/useQueryParams';
import { filterByQueryParams } from '../../utils/filterByQueryParams';

import styles from './styles.module.scss';

export const Goods = () => {
  const { queryParams } = useQueryParams();
  const goodsByFilter = queryParams ? filterByQueryParams(goods, queryParams) : goods;

  return (
    <div className={styles.goods}>
      <aside className={styles.goods__sidebar}>
        <CheckBoxFilter currentGoods={goodsByFilter} flag="category" />
        <CheckBoxFilter currentGoods={goodsByFilter} flag="brand" />
      </aside>
      <ArticleList goods={goodsByFilter} />;
    </div>
  );
};
