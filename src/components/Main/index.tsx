import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import { Footer } from '../Footer';

export const Main = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};
