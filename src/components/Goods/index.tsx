import { ArticleList } from '../ArticleList';
import { CheckBoxFilter } from '../Filters/CheckBoxFilter';
import goods from '../../goods.json';
import { useQueryParams } from '../../hooks/useQueryParams';
import { filterByQueryParams } from '../../utils/filterByQueryParams';
import { SearchField } from '../Filters/SearchField';
import { SortField } from '../Filters/SortField';
import { ViewToggler } from '../Filters/ViewToggler';
import { CopyUrl } from '../Filters/CopyUrl';
import { useMemo } from 'react';
import styles from './styles.module.scss';

export const Goods = () => {
  const { queryParams, setSearchParams } = useQueryParams();
  const goodsByFilter = useMemo(() => {
    return queryParams ? filterByQueryParams(goods, queryParams) : goods;
  }, [queryParams]);

  return (
    <div className={styles.goods}>
      <aside className={styles.goods__sidebar}>
        <SearchField />
        <SortField />
        <ViewToggler />
        <CheckBoxFilter currentGoods={goodsByFilter} flag="category" />
        <CheckBoxFilter currentGoods={goodsByFilter} flag="brand" />
        <p>{goodsByFilter.length === 0 ? 'Nothing found' : `total goods: ${goodsByFilter.length}`}</p>
        <button type="button" onClick={() => setSearchParams()}>
          Reset Filters
        </button>
        <CopyUrl />
      </aside>
      {goodsByFilter.length === 0 ? 'Goods not found' : <ArticleList goods={goodsByFilter} />}
    </div>
  );
};
