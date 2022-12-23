import ReactSlider from 'react-slider';
import { useQueryParams } from '../../../hooks/useQueryParams';
import styles from './styles.module.scss';

export const RangeField = (props: { flag: 'price' | 'rating' }) => {
  const { flag } = props;
  const { getRangeFilterValues, setQueryParams } = useQueryParams();
  const [minValue, maxValue, min, max] = getRangeFilterValues(flag);

  return (
    <div className={styles.slider}>
      <h2 className={styles.sliderTitle}>Filter by {flag}</h2>
      <ReactSlider
        value={[minValue, maxValue]}
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
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};
