import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { getGoodsCartPerPage } from '../../helpers/handleCart';
import { CartArticle } from './CartArticle';
import { CartPromo } from './CartPromo';
import type { CartItem, CartProduct } from '../../types';
import './style.scss';

export const Cart = () => {
  const [cartState] = useLocalStorageState('cart');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 3;
  const [value, setValue] = useState(limit);
  const isEmptyPage = (page - 1) * limit === (cartState as CartItem[])?.length;
  const [pageNumber, goodsCartPerPage] = getGoodsCartPerPage(cartState as CartItem[] | null, page, limit) as [
    number,
    CartProduct[]
  ];

  useEffect(() => setValue(limit), [limit]);

  useEffect(() => {
    if (isEmptyPage) {
      searchParams.set('page', `${page - 1}`);
      setSearchParams(searchParams);
    }
  }, [isEmptyPage, page, searchParams, setSearchParams]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const newPageNumber = Math.ceil((cartState as CartItem[]).length / Number(value));
    if (pageNumber > newPageNumber) {
      searchParams.set('page', `${newPageNumber}`);
    }
    searchParams.set('limit', value);
    setSearchParams(searchParams);
  };

  const handleClick = (step: -1 | 1) => {
    searchParams.set('page', `${page + step}`);
    setSearchParams(searchParams);
  };

  return Boolean(pageNumber) ? (
    <div className="cart">
      <div className="cart__body">
        <div className="cart__header">
          <h2 className="cart__title"> Cart</h2>
          <div className="cart__pagination">
            <label className="cart__limit">
              <span className="cart__limit-span"> goods per page:</span>
              <input
                type="number"
                value={value}
                min="1"
                onChange={handleChange}
                onKeyDown={(e) => e.preventDefault()}
              />
            </label>
            <span className="cart__page">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => {
                  handleClick(-1);
                }}>
                prev
              </button>
              <span className="cart-current-page">Current page: {page}</span>
              <button
                type="button"
                disabled={page === pageNumber}
                onClick={() => {
                  handleClick(1);
                }}>
                next
              </button>
            </span>
          </div>
        </div>
        <ul className="cart__list">
          {goodsCartPerPage.map((data) => (
            <CartArticle key={data.article.id} article={data.article} index={data.index + 1} amount={data.amount} />
          ))}
        </ul>
      </div>
      <CartPromo />
    </div>
  ) : (
    <div className="cart-empty">Cart is empty</div>
  );
};
