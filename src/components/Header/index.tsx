import { getGoodsCart } from '../../utils/getGoodsCart';

import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
export const Header = () => {
  const { total, amount } = getGoodsCart();

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <span>total:&nbsp;{total}$</span>
        <Link to={'cart'}> CartSVG</Link>
        <span>{amount}</span>
      </div>
    </div>
  );
};
