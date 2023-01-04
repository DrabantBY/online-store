import { Link } from 'react-router-dom';
import './style.scss';

export const Error = () => (
  <div className='error-container'>
    <span className='error-text'>Oops, something went wrong</span> 
    <Link to={'/'} className='error-button-back'>
      <span>Return to home page</span>
    </Link>
  </div>);
