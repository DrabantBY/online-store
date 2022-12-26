import { useParams, Link } from 'react-router-dom';
import goods from '../../goods.json';
import { useState } from 'react';
import { Product, CartItem  } from '../../types';
import useLocalStorageState from 'use-local-storage-state';
import { addToCart, removeFromCart, isInCart } from '../../helpers/handleCart';
import './article.scss';

export const Article = (props: {elemId?: number; elemName?: string}) => {
  const {elemId, elemName} = props;
  const { id } = useParams();
  let resID: number;
  if(elemId) {
    resID = elemId;
  }else{
    resID = Number(id);
  }
  const [cartState, setCartState] = useLocalStorageState('cart', {
    defaultValue: [] as CartItem[],
  });
  
  const article = goods.find((article) => article.id === resID);
  const [indexImg, setIndexImg] = useState(0);
  const {
    brand, 
    title, 
    category,
    description,
    price, 
    rating, 
    discountPercentage, 
    images,
    stock
  }: Product = article!;
  return (
    <div className="article-container">
      <div className="article-container-image"> 
        {!elemName ? 
          <ul className='article-image-list'>
          {images.map((element, index) => (
            <li className='article-list-elem' key={`article_img${index}`} onClick={() => {setIndexImg(index)}}>
              <img className='article-image-list-elem' src={element} alt="photo"/>
            </li>
          ))}
        </ul>
        :null
      }
        <div className='article-container-main-image'>
          <div className='article-container-title'>
            <span className='article-title'>{title}</span>
            <span className='article-brand'>{`by ${brand}`}</span>
          </div>
          <img className='article-main-image' src={images[indexImg]} alt="" />
        </div>
      </div>
      <div className='article-container-text'>
          <div className='article-container-price'>
            <span className='article-price-new'>{`Price: ${(+price - (+price)*(+discountPercentage/100)).toFixed(2)}`}</span>
            <p className='article-price-old'>{price}</p>
            <p className='article-price-discount'>{`-${discountPercentage}%`}</p>
          </div>
          <p className='article-container-stock-rating'>
            <p>
              <span className='article-stock'>Remaining in stock: </span>
              <b>{stock}</b>
            </p>
            <p>
              <span className='article-rating'>Product rating: </span>
              <b>{rating}</b>
            </p>
          </p>
          <p className='article-description'>{description}</p>
          <div className='article-container-button'>
            <button                   
              className = {(isInCart(cartState, resID)) ? 'article-list-active': 'article-list-default'} 
              type="button"
              onClick={() => {
                const data = { id: resID, amount: 1 };
                const newCartState = isInCart(cartState, resID)
                  ? removeFromCart(cartState, resID)
                  : addToCart(cartState, data);
                    setCartState(newCartState);
                }}>
                {isInCart(cartState, resID) ? <span>Remove from Cart</span> : <span>Add to Cart</span>}
            </button>
            {!elemName ?
              <button className='article-button-buy'>
                <span>buy now</span>
              </button>
              :null
            }
            {!elemName ?
              <button className='article-button-back'>
                <Link to={`/`}>
                  <span>back</span>
                </Link>
              </button>
              : null
            }
            {elemName ?
              <button className='article-button-back'>
                <Link to={`${resID}`}>
                  <span>Details</span>
                </Link>
              </button>
              : null
            }
          </div>
      </div>
    </div>
  );
};
