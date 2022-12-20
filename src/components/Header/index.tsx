import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
export const Header = () => (
  <div className={styles.header}>
    <div className={styles.header__container}>
      <span>0</span>
      <Link to={'cart'}> CartSVG</Link>
      <span>0</span>
    </div>
  </div>
);
