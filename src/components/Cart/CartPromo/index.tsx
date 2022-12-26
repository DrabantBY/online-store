import type { CartItem } from '../../../types';
import useLocalStorageState from 'use-local-storage-state';
import { getFromCart } from '../../../helpers/handleCart';
import { useState } from 'react';
import './styles.scss';

export const CartPromo = () => {
  const [value, setValue] = useState('');
  const [promoState, setPromoState] = useLocalStorageState('promo', {
    defaultValue: [] as string[],
  });
  const [cartState] = useLocalStorageState('cart');
  const { total, amount } = getFromCart(cartState as CartItem[]);
  const sale = (total * 10 * promoState.length) / 100;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const value = form.promo.value as string;

    if (/^promo-code-[1-9]$/.test(value) && !promoState.includes(value)) {
      setPromoState([...promoState, value]);
    }

    setValue('');
  };

  return (
    <section className="promo">
      <h2 className="promo__title">summary</h2>
      <p className="promo__amount">goods: {amount}</p>
      <p className="promo__sum">
        total: <span className={sale ? 'old' : ''}>{total}$</span> {sale ? <span>{total - sale}$</span> : null}
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Promotion code:
          <input
            type="text"
            name="promo"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="promo-code-digit"
          />
        </label>
        <button type="submit">use</button>
      </form>
      {promoState.length ? (
        <ul>
          {promoState.map((li, index) => (
            <li key={index}>
              {li} - 10%
              <button type="button" onClick={() => setPromoState(promoState.filter((el) => el !== li))}>
                rem
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <button type="button">buy now</button>
    </section>
  );
};
