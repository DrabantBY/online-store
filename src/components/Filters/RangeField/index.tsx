import ReactSlider from 'react-slider';
import { useMemo } from 'react';

import { useQueryParams } from '../../../hooks/useQueryParams';
import { Product } from '../../../types';
import { getMinMaxValue } from '../../../helpers/getMinMaxValue';
import goods from '../../../goods.json';

import styles from './styles.module.scss';

export const RangeField = (props: { currentGoods: Product[]; flag: 'price' | 'rating' }) => {
  const { currentGoods, flag } = props;
  const [minValue, maxValue] = useMemo(() => getMinMaxValue(currentGoods, flag), [currentGoods, flag]);
  const [min, max] = useMemo(() => getMinMaxValue(goods, flag), [flag]);
  const { getRangeFilterValues, setQueryParams } = useQueryParams();
  const values = getRangeFilterValues(flag);

  return (
    <div className={styles.slider}>
      <h2 className={styles.sliderTitle}>Filter by {flag}</h2>
      <ReactSlider
        value={values ? [values[0], values[1]] : [minValue ?? min, maxValue ?? max]}
        className={styles.sliderBody}
        min={min}
        max={max}
        step={flag === 'price' ? 1 : 0.01}
        withTracks={true}
        pearling={true}
        renderThumb={(props) => <div {...props} className={styles.sliderThumb}></div>}
        renderTrack={(props) => <div {...props} className={styles.sliderTrack}></div>}
        onChange={([minValue, maxValue]) => setQueryParams(flag, `${minValue}~${maxValue}`)}
      />

      <div className={styles.sliderValue}>
        <span>{values ? values[0] : minValue ?? min}</span>
        <span>{values ? values[1] : maxValue ?? max}</span>
      </div>
    </div>
  );
};
