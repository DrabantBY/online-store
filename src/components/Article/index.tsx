import { useParams, Link, useNavigate } from 'react-router-dom';
import goods from '../../goods.json';
import { useState, useEffect } from 'react';
import { Product, CartItem } from '../../types';
import useLocalStorageState from 'use-local-storage-state';
import { addToCart, removeFromCart, isInCart } from '../../helpers/handleCart';
import './article.scss';

export const Article = (props: { elemId?: number; elemName?: string }) => {
  const { elemId, elemName } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && (isNaN(+id) || +id <= 0 || +id > goods.length)) {
      navigate('/error');
    }
  }, [id, navigate]);

  let resID: number;
  if (elemId) {
    resID = elemId;
  } else {
    resID = Number(id);
  }
  const [cartState, setCartState] = useLocalStorageState('cart', {
    defaultValue: [] as CartItem[],
  });

  const inCart = isInCart(cartState, resID);

  const article = goods.find((article) => article.id === resID);
  const [indexImg, setIndexImg] = useState(0);

  if (article) {
    const { brand, title, category, description, price, rating, discountPercentage, images, stock }: Product = article;
    return (
      <div className="article-container">
        <div className="article-container-path-image">
          {!elemName ? (
            <div className="article-container-path">
              <Link to={`/`}>
                <p>Store</p>
              </Link>
              <p className='article-arrows'>{`>>`}</p>
              <p>{`${category}`}</p>
              <p className='article-arrows'>{`>>`}</p>
              <p className='article-brand'>{`${brand}`}</p>
              <p className='article-arrows'>{`>>`}</p>
              <p  className='article-title'>{`${title}`}</p>
            </div>
          ) : null}
          <div className="article-container-image">
            {!elemName ? (
              <ul className="article-image-list">
                {Array.from(new Set(images)).map((element, index, array) => (
                  <li
                    className="article-list-elem"
                    key={`article_img${index}`}
                    onClick={() => {
                      setIndexImg(index);
                    }}>
                    <img className="article-image-list-elem" src={element} alt="article" />
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="article-container-main-image">
              <div className="article-container-title">
                <span className="article-title">{title}</span>
                <span className="article-brand">{`by ${brand}`}</span>
              </div>
              {elemName ? (
                <Link to={`${resID}`}>
                  <img className="article-main-image" src={images[indexImg]} alt="" />
                </Link>
              ) : (
                <img className="article-main-image" src={images[indexImg]} alt="" />
              )}
            </div>
          </div>
        </div>
        <div className="article-container-text">
          <div className="article-container-price">
            <span className="article-price-new">{`Price: ${+price}`}</span>
            <p className="article-price-discount">{`-${discountPercentage}%`}</p>
          </div>
          <div className="article-container-stock-rating">
            <p>
              <span className="article-stock">Remaining in stock: </span>
              <b>{stock}</b>
            </p>
            <p>
              <span className="article-rating">Product rating: </span>
              <b>{rating}</b>
            </p>
          </div>
          <p className="article-description">{description}</p>
          <div className="article-container-button">
            <button
              className={inCart ? 'article-list-active' : 'article-list-default'}
              type="button"
              onClick={() => {
                const data = { id: resID, amount: 1 };
                const newCartState = inCart ? removeFromCart(cartState, resID) : addToCart(cartState, data);
                setCartState(newCartState);
              }}>
              {inCart ? <span>Remove from Cart</span> : <span>Add to Cart</span>}
            </button>
            {!elemName ? (
              <button
                className="article-button-buy"
                onClick={() => {
                  if (!inCart) {
                    const data = { id: resID, amount: 1 };
                    const newCartState = addToCart(cartState, data);
                    setCartState(newCartState);
                  }
                  navigate('/cart', { state: 1 });
                }}>
                <span>buy now</span>
              </button>
            ) : null}
            {!elemName ? (
              <Link to={`/`} className="article-button-back">
                <span>back</span>
              </Link>
            ) : null}
            {elemName ? (
              <Link to={`goods/${resID}`} className="article-button-back">
                <span>Details</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else return null;
};
