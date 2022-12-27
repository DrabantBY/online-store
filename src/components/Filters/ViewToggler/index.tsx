import { useQueryParams } from '../../../hooks/useQueryParams';
import './styles.scss';

export const ViewToggler = () => {
  const { viewValue, setQueryParams } = useQueryParams();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const text = (e.target as HTMLButtonElement).textContent;
    setQueryParams('view', text === 'block' ? 'list' : 'block');
  };

  return (
    <button className='toggle-button' type="button" onClick={handleClick}>
      <span>{viewValue}</span>
    </button>
  );
};
