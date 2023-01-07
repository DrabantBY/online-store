import { Link } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { getFromCart } from '../../helpers/handleCart';

import type { CartItem } from '../../types';
import './styles.scss';

export const Header = () => {
  const [cartState] = useLocalStorageState('cart');
  const { total, amount } = getFromCart(cartState as CartItem[]);

  return (
    <div className="header">
      <div className="header-container">
        <Link to={'/'}>
          <h1 className="header-name">Online Store</h1>
        </Link>
        <span className="header-total">{`total: ${total}$`}</span>
        <Link to={'cart'} className="header-container-cart">
          <span className="header-cart-count">{amount}</span>
          <AiOutlineShoppingCart fontSize="3em" color="#2C3E50" />
        </Link>
      </div>
    </div>
  );
};
