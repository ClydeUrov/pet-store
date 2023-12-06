import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from '../Loader/Loader';
import Header from '../../pages/Header/Header';
import Footer from '../../pages/Footer/Footer';
import { ConstantsProvider } from '../../helpers/routs/ConstantsProvider';

export const Layout = () => {
  return (
    <ConstantsProvider>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </ConstantsProvider>
  );
};