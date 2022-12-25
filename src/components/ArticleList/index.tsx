import type { Product, CartItem } from '../../types';
import { Link } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import useLocalStorageState from 'use-local-storage-state';
import styles from './styles.module.scss';
import { addToCart, removeFromCart, isInCart } from '../../helpers/handleCart';
import { Article } from '../Article';
import './articlelist.scss';


export const ArticleList = (props: { goods: Product[] }) => {
  const { viewValue } = useQueryParams();
  const [cartState, setCartState] = useLocalStorageState('cart', {

    defaultValue: [] as CartItem[],
  });
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {};


  return (
    <ul className={styles[`card-${viewValue}`]}>
      {props.goods.map((article) => (
        <li key={article.id} className='li-card'>
          <Link to={`${article.id}`} className={styles[`card-${viewValue}Link`]}>
            {(viewValue === "block") ? 
            <div className='container-card-block'>
              <figure>
              <div>
                <span className='article-title'>{article.title}</span>
                <span className='article-brand'>{`by ${article.brand}`}</span>
              </div>
              <img src={article.thumbnail} alt="article icon"></img>

              <figcaption>{article.title}</figcaption>
            </figure>

              </figure>
              <div>
              <div className='article-container-price'>
                <span className='article-price-new'>{`Price: ${(+article.price - (+article.price)*(+article.discountPercentage/100)).toFixed(2)}`}</span>
                <p className='article-price-old'>{article.price}</p>
                <p className='article-price-discount'>{`-${article.discountPercentage}%`}</p>
              </div>
              <p className='article-container-stock-rating'>
                <p>
                  <span className='article-stock'>Remaining in stock: </span>
                  <b>{article.stock}</b>
                </p>
                <p>
                 <span className='article-rating'>Product rating: </span>
                  <b>{article.rating}</b>
                </p>
              </p>
              </div>
              <div>
                <button type="button" onClick={handleClick}>
                  add to Cart
                </button>
              </div>
            </div>
            : <Article elemId = {article.id} elemName = {'cardLost'} />
            }  


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
