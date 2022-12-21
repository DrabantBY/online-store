import { useQueryParams } from '../../../hooks/useQueryParams';
import styles from './styles.module.scss';

export const ViewToggler = () => {
  const { viewValue, setQueryParams } = useQueryParams();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const text = (e.target as HTMLButtonElement).textContent;
    if (text === 'block') {
      setQueryParams('view', 'list');
    } else {
      setQueryParams('view', 'block');
    }
  };
  return (
    <button type="button" onClick={handleClick}>
      {viewValue}
    </button>
  );
};
