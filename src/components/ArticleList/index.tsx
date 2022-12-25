import type { Product, CartItem } from '../../types';
import { Link } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import useLocalStorageState from 'use-local-storage-state';
import styles from './styles.module.scss';
import { addToCart, removeFromCart, isInCart } from '../../helpers/handleCart';

export const ArticleList = (props: { goods: Product[] }) => {
  const { viewValue } = useQueryParams();
  const [cartState, setCartState] = useLocalStorageState('cart', {
    defaultValue: [] as CartItem[],
  });

  return (
    <ul className={styles[`cards-${viewValue}`]}>
      {props.goods.map((article) => (
        <li key={article.id} className={styles.cardItem}>
          <Link to={`${article.id}`} className={styles[`card-${viewValue}Link`]}>
            <figure>
              <img src={article.thumbnail} alt="article icon"></img>
              <figcaption>{article.title}</figcaption>
            </figure>
          </Link>
          <div>
            <span>{article.price}$</span>
            <span>stock: {article.stock}</span>
            <span>rating: {article.rating}</span>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                const data = { id: article.id, amount: 1 };
                const newCartState = isInCart(cartState, article.id)
                  ? removeFromCart(cartState, article.id)
                  : addToCart(cartState, data);
                setCartState(newCartState);
              }}>
              {isInCart(cartState, article.id) ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
