import type { Product } from '../../types';
import { Link } from 'react-router-dom';

export const ArticleList = (props: { goods: Product[] }) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {};

  return (
    <ul>
      {props.goods.map((article) => (
        <li key={article.id}>
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
            <Link to={`${article.id}`}>details</Link>
            <button type="button" onClick={handleClick}>
              add
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
