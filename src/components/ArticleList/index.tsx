import type { Product, CartItem } from '../../types';
import { Link } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import useLocalStorageState from 'use-local-storage-state';
import styles from './styles.module.scss';
import { addToCart, removeFromCart, isInCart } from '../../helpers/handleCart';
import { Article } from '../Article';
import './article-list.scss';

export const ArticleList = (props: { goods: Product[] }) => {
  const { viewValue } = useQueryParams();
  const [cartState, setCartState] = useLocalStorageState('cart', {
    defaultValue: [] as CartItem[],
  });

  return (
    <ul className={styles[`card-${viewValue}`]}>
      {props.goods.map((article) => (
        <li key={article.id} className="li-card">
          {viewValue === 'block' ? (
            <div className="container-card-block">
              <figure>
                <div>
                  <span className="article-title">{article.title}</span>
                  <span className="article-brand">{`by ${article.brand}`}</span>
                </div>
                <button>
                  <Link to={`goods/${article.id}`} className={styles[`card-${viewValue}Link`]}>
                    <img src={article.thumbnail} alt="article icon"></img>
                  </Link>
                </button>
              </figure>
              <div>
                <div className="article-container-price">
                  <span className="article-price-new">{`Price: ${(
                    +article.price -
                    +article.price * (+article.discountPercentage / 100)
                  ).toFixed(2)}`}</span>
                  <p className="article-price-old">{article.price}</p>
                  <p className="article-price-discount">{`-${article.discountPercentage}%`}</p>
                </div>
                <div className="article-container-stock-rating">
                  <p>
                    <span className="article-stock">Remaining in stock: </span>
                    <b className="article-stock-num">{article.stock}</b>
                  </p>
                  <p>
                    <span className="article-rating">Product rating: </span>
                    <b className="article-rating-num">{article.rating}</b>
                  </p>
                </div>
              </div>
              <div className="article-list-container-button">
                <button
                  className={isInCart(cartState, article.id) ? 'article-list-active' : 'article-list-default'}
                  type="button"
                  onClick={() => {
                    const data = { id: article.id, amount: 1 };
                    const newCartState = isInCart(cartState, article.id)
                      ? removeFromCart(cartState, article.id)
                      : addToCart(cartState, data);
                    setCartState(newCartState);
                  }}>
                  {isInCart(cartState, article.id) ? <span>Remove from Cart</span> : <span>Add to Cart</span>}
                </button>
                <button>
                  <Link to={`goods/${article.id}`} className={styles[`card-${viewValue}Link`]}>
                    <span>Details</span>
                  </Link>
                </button>
              </div>
            </div>
          ) : (
            <Article elemId={article.id} elemName={'cardLost'} />
          )}
        </li>
      ))}
    </ul>
  );
};
