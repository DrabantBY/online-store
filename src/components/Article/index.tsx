import { useParams, Link } from 'react-router-dom';
import goods from '../../goods.json';

export const Article = () => {
  const { id } = useParams();
  const article = goods.find((article) => article.id === Number(id));

  return (
    <div>
      <figure>
        <img src={article?.thumbnail} alt="article icon"></img>
        <figcaption>{article?.title}</figcaption>
      </figure>
      <p>{article?.description}</p>
      <div>
        <Link to={`/`}>back</Link>
        <button type="button">add to cart</button>
        <button type="button">buy right now</button>
      </div>
    </div>
  );
};
