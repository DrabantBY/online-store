import { Goods } from './components/Goods';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error } from './components/Error';
import { Main } from './components/Main';
import { Article } from './components/Article';
import { Cart } from './components/Cart';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Goods />} />
        <Route path="cart" element={<Cart />} />
        <Route path=":id" element={<Article />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
