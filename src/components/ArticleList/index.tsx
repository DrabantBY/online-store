import type { Product } from '../../types';
import { Link } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import styles from './styles.module.scss';

export const ArticleList = (props: { goods: Product[] }) => {
  const { viewValue } = useQueryParams();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {};

  return (
    <ul className={styles[`cards-${viewValue}`]}>
      {props.goods.map((article) => (
        <li key={article.id} className={styles.cardItem}>
          <Link to={`${article.id}`} className={styles[`card-${viewValue}Link`]}>
            <figure>
              <img src={article.thumbnail} alt="article icon"></img>
              <figcaption>{article.title}</figcaption>
            </figure>
            <div>
              <span>{article.price}$</span>
              <span>stock: {article.stock}</span>
              <span>rating: {article.rating}</span>
            </div>
            <div>
              <button type="button" onClick={handleClick}>
                add to Cart
              </button>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
