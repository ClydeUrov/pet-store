import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../Loader/Loader";
import Header from "../../pages/Header/Header";
import Footer from "../../pages/Footer/Footer";
import { ConstantsProvider } from "../../helpers/routs/ConstantsProvider";
import { UserLoginedProvider } from "../../helpers/routs/UserLoginedContext";

export const Layout = () => {
  return (
    <ConstantsProvider>
      <UserLoginedProvider>
        <Header />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <Footer />
      </UserLoginedProvider>
    </ConstantsProvider>
  );
};
