import useLocalStorageState from 'use-local-storage-state';

import { addToCart } from '../../../helpers/handleCart';

import type { Product, CartItem } from '../../../types';
import './style.scss';

export const CartArticle = (props: { article: Product; index: number; amount: number }) => {
  const { article, index, amount } = props;
  const [cartState, setCartState] = useLocalStorageState('cart');

  const handleClick = (id: number, amount: 1 | -1) => {
    const newCartState = addToCart(cartState as CartItem[], { id, amount });
    setCartState(newCartState);
  };

  return (
    <li className="cart__item">
      <div className="cart__index-container"><span className="cart__index">{index}</span></div>  
      <figure className="cart__image-container">
        <img className="cart__image" src={article.thumbnail} alt="article thumbnail" />
      </figure>
      <div className="cart__information-container">
        <div className="cart__description">
          <h2 className="cart__title">{article.title}</h2>
          <p className="cart__text"> {article.description}</p>
          <div className="cart__props">
            <span className="cart__rating">Rating: {article.rating}</span>
            <span className="cart__stock">Stock: {article.stock}</span>
          </div>
        </div>
        <div className="cart__controls">
          <button className="cart__btn-minus" type="button" onClick={() => handleClick(article.id, -1)}>
            <span>-</span>
          </button>
          <span className="cart__amount">{amount}</span>
          <button
            className="cart__btn-plus"
            type="button"
            disabled={amount === article.stock}
            onClick={() => handleClick(article.id, 1)}>
            <span>+</span>
          </button>
          <p className="cart__total">{amount * article.price}$</p>
        </div>
      </div>
    </li>
  );
};
