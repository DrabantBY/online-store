import { Link } from 'react-router-dom';
import type { CartItem } from '../../types';
import styles from './styles.module.scss';
import useLocalStorageState from 'use-local-storage-state';
import { getFromCart } from '../../helpers/handleCart';

export const Header = () => {
  const [cartState] = useLocalStorageState('cart');
  const { total, amount } = getFromCart(cartState as CartItem[]);


  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Link to={'/'}>go home</Link>
        <span>total:&nbsp;{total}$</span>
        <Link to={'cart'}> CartSVG</Link>
        <span>{amount}</span>
      </div>
    </div>
  );
};
