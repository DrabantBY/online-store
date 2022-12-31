import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useLocalStorageState from 'use-local-storage-state';
import { useNavigate } from 'react-router-dom';

import './style.scss';

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  cardNumber: string;
  cardDate: string;
  cardCode: string;
};

export const ModalForm = (props: { onClose: () => void }) => {
  const [counter, setCounter] = useState(5);
  const [state, setState] = useState(false);
  const [, setCartState] = useLocalStorageState('cart');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setState(true);
  };

  const cardNumberValue = getValues('cardNumber') || '';

  useEffect(() => {
    if (state) {
      const timer = setInterval(() => {
        setCounter((counter) => counter - 1);
      }, 1000);
      console.log(counter);

      if (!counter) {
        navigate('/');
        setTimeout(() => setCartState([]), 0);
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [counter, navigate, setCartState, state]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { key } = e;
    !(
      (key >= '0' && key <= '9') ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight' ||
      key === 'Delete' ||
      key === 'Backspace'
    ) && e.preventDefault();
  };

  const handleKeyDownDate: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    handleKeyDown(e);
    const { key } = e;
    const { value } = e.target as HTMLInputElement;
    key >= '0' && key <= '9' && value.length === 2 && ((e.target as HTMLInputElement).value = value + '/');
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    (e.target as HTMLInputElement).classList.contains('modal') && props.onClose();
  };

  return (
    <div className="modal" onClick={handleClick}>
      {state ? (
        <p>Thanks for your order. Redirect to the store after {counter} sec</p>
      ) : (
        <form className="modal__body" onSubmit={handleSubmit(onSubmit)}>
          <div className="modal__field">
            <input
              {...register('fullName', {
                required: 'required',
                pattern: { value: /^[a-z]{3,}\s[a-z]{3,}$/i, message: 'invalid full name' },
              })}
              placeholder="full name"
            />
            {errors?.fullName && <span>{errors.fullName.message}</span>}
          </div>
          <div className="modal__field">
            <input
              {...register('email', {
                required: 'required',
                pattern: { value: /^\w+@\w+\.[a-z]{2,}$/i, message: 'invalid email' },
              })}
              placeholder="email"
            />
            {errors?.email && <span>{errors.email.message}</span>}
          </div>
          <div className="modal__field">
            <input
              {...register('phone', {
                required: 'required',
                pattern: { value: /^\+\d{9,}$/, message: 'invalid number' },
              })}
              placeholder="phone number"
            />
            {errors?.phone && <span>{errors.phone.message}</span>}
          </div>
          <div className="modal__field">
            <input
              {...register('address', {
                required: 'required',
                pattern: { value: /^([a-z]{5,}\s){2}[a-z]{5,}$/, message: 'invalid address' },
              })}
              placeholder="delivery address"
            />
            {errors?.address && <span>{errors.address.message}</span>}
          </div>

          <div className="modal__card">
            <div className="card__logo">
              {cardNumberValue.startsWith('4')
                ? 'Visa'
                : cardNumberValue.startsWith('5')
                ? 'MasterCard'
                : 'OtherSystem'}
            </div>
            <div className="card__field">
              <input
                {...register('cardNumber', {
                  required: 'required',
                  pattern: { value: /^\d{16,}$/, message: 'invalid card number' },
                  onChange: (e) => {
                    const { value } = e.target;
                    value.length > 16 && (e.target.value = value.slice(0, -1));
                  },
                })}
                placeholder="card number"
                onKeyDown={handleKeyDown}
              />
              {errors?.cardNumber && <span>{errors.cardNumber.message}</span>}
            </div>
            <div className="card__field">
              <input
                {...register('cardDate', {
                  required: 'required',
                  pattern: { value: /^(0[1-9]|1[0-2])\/\d{2,}$/, message: 'invalid card date' },
                  onChange: (e) => {
                    const { value } = e.target;
                    value.length > 5 && (e.target.value = value.slice(0, -1));
                  },
                })}
                placeholder="date"
                onKeyDown={handleKeyDownDate}
              />
              {errors?.cardDate && <span>{errors.cardDate.message}</span>}
            </div>

            <div className="card__field">
              <input
                {...register('cardCode', {
                  required: 'required',
                  pattern: { value: /^\d{3,}$/, message: 'invalid card code' },
                  onChange: (e) => {
                    const { value } = e.target;
                    value.length > 3 && (e.target.value = value.slice(0, -1));
                  },
                })}
                placeholder="CVV"
                onKeyDown={handleKeyDown}
              />
              {errors?.cardCode && <span>{errors.cardCode.message}</span>}
            </div>
          </div>

          <button type="submit" disabled={!isValid}>
            send
          </button>
        </form>
      )}
    </div>
  );
};
