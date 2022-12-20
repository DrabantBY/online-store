import { useSearchParams } from 'react-router-dom';
import { updateCategoryBrandParams } from '../utils/updateCategoryBrandParams';
import { getQueryParams } from '../utils/getQueryParams';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQueryParams = (flag: string, value: string) => {
    switch (true) {
      case flag === 'category' || flag === 'brand':
        updateCategoryBrandParams(searchParams, flag, value);
        break;
    }
    setSearchParams(searchParams);
  };

  const queryParams = getQueryParams(searchParams);

  return { queryParams, setQueryParams };
};
