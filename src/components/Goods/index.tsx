import { ArticleList } from '../ArticleList';
import { CheckBoxFilter } from '../Filters/CheckBoxFilter';
import goods from '../../goods.json';
import { useQueryParams } from '../../hooks/useQueryParams';
import { filterByQueryParams } from '../../utils/filterByQueryParams';
import { SearchField } from '../Filters/SearchField';
import { SortField } from '../Filters/SortField';
import { ViewToggler } from '../Filters/ViewToggler';
import { useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

export const Goods = () => {
  const { queryParams, setSearchParams } = useQueryParams();
  const location = useLocation();
  const goodsByFilter = queryParams ? filterByQueryParams(goods, queryParams) : goods;

  return (
    <div className={styles.goods}>
      <aside className={styles.goods__sidebar}>
        <SearchField />
        <p>{goodsByFilter.length === 0 ? 'Nothing found' : `total goods: ${goodsByFilter.length}`}</p>
        <SortField />
        <ViewToggler />
        <CheckBoxFilter currentGoods={goodsByFilter} flag="category" />
        <CheckBoxFilter currentGoods={goodsByFilter} flag="brand" />
        <button type="button" onClick={() => setSearchParams()}>
          Reset Filters
        </button>
        <button type="button">copy link</button>
      </aside>
      <ArticleList goods={goodsByFilter} />
    </div>
  );
};
