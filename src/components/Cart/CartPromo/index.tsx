import type { CartItem } from '../../../types';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { getFromCart } from '../../../helpers/handleCart';
import { ModalForm } from '../../ModalForm';
import './styles.scss';

export const CartPromo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log('render');

  const [value, setValue] = useState('');
  const [modal, setModal] = useState(Boolean(location.state));
  const [promoState, setPromoState] = useLocalStorageState('promo', {
    defaultValue: [] as string[],
  });
  const [cartState] = useLocalStorageState('cart');
  const { total, amount } = getFromCart(cartState as CartItem[]);
  const sale = (total * 10 * promoState.length) / 100;

  useEffect(() => {
    navigate('/cart', { replace: true });
  }, [navigate]);

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
      <h2 className="promo__title">Summary:</h2>
      <p className="promo__amount">
        Goods: <span>{amount}</span>
      </p>
      <p className="promo__sum">
        Total: <span className={sale ? 'old' : ''}>{total}$</span> {sale ? <span>{total - sale}$</span> : null}
      </p>
      <form onSubmit={handleSubmit} className="promo-form">
        <label>
          <span>Promotion code:</span>
          <input
            type="text"
            name="promo"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="promo-code-digit"
          />
        </label>
        <button type="submit">
          <span>use</span>
        </button>
      </form>
      {promoState.length ? (
        <ul className="promo-code-actual">
          {promoState.map((li, index) => (
            <li key={index}>
              {li} - 10%
              <button type="button" onClick={() => setPromoState(promoState.filter((el) => el !== li))}>
                <span>rem</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <button className="button-buy" type="button" onClick={() => setModal(true)}>
        <span>buy now</span>
      </button>
      {modal && <ModalForm onClose={() => setModal(false)} />}
    </section>
  );
};
