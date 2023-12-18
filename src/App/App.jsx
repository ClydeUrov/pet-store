import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "../pages/Cart/Cart";
import Catalog from "../pages/Catalog/Catalog";
import Error from "../components/Error/Error";
import Homepage from "../pages/Homepage/Homepage";
import ProductPage from "../pages/ProductPage/ProductPage";
import { Layout } from "../components/Layout/Layout";
import "./App.module.scss";
import { PrivateRoute } from "../helpers/routs/PrivateRoute";
import AdminPage from "../pages/AdminPage/AdminPage";
import Favorites from "../pages/Favorites/Favorites";
import UserProfile from "../components/AdminFolder/Users/UserProfile";
import Users from "../components/AdminFolder/Users/Users";
import AdminContentRoute from "../helpers/routs/AdminContentRoute";
import CreateUpdateProduct from "../components/AdminFolder/ContentFolder/Products/CreateUpdateProduct/CreateUpdateProduct";
// import UpdateProduct from '../components/AdminFolder/ContentFolder/Products/CreateUpdateProduct/UpdateProduct';

const UserPage = lazy(() => import("../pages/UserPage/UserPage"));
const UserAccount = lazy(() => import("../components/UserAccount/UserAccount"));
const UserInfo = lazy(() => import("../components/UserInfo/UserInfo"));
const UserOrdersAll = lazy(() =>
  import("../components/UserOrdersAll/UserOrdersAll")
);
const UserOrderItem = lazy(() =>
  import("../components/UserOrderItem/UserOrderItem")
);
const UserReviews = lazy(() => import("../components/UserReviews/UserReviews"));

const Orders = lazy(() => import("../components/AdminFolder/Orders/Orders"));
const AdminProfile = lazy(() =>
  import("../components/AdminFolder/AdminProfile/AdminProfile")
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/catalogue/:category" element={<Catalog />}>
            <Route path=":itemName" element={<Catalog />} />
          </Route>
          <Route
            path="/catalogue/products/:productId"
            element={<ProductPage />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/user"
            element={<PrivateRoute redirectTo="/" component={<UserPage />} />}
          >
            <Route path="account" element={<UserAccount />}></Route>
            <Route path="info" element={<UserInfo />}></Route>
            <Route path="orders" element={<UserOrdersAll />}></Route>
            <Route path="orders/:orderId" element={<UserOrderItem />}></Route>
            <Route path="reviews" element={<UserReviews />}></Route>
          </Route>

          <Route path="/*" element={<Error />} />
        </Route>
        <Route
          path="/admin"
          element={<PrivateRoute redirectTo="/" component={<AdminPage />} />}
        >
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserProfile />} />
          <Route path="account" element={<AdminProfile />} />
          <Route path=":contentName" element={<AdminContentRoute />} />
          <Route path="products/create" element={<CreateUpdateProduct />} />
          {/* <Route path="products/update" element={<UpdateProduct />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
