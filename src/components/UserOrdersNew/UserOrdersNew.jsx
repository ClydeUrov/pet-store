import css from "./UserOrdersNew.module.scss";
import UserOrdersList from "../UserOrdersList/UserOrdersList";
// import { useState, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';
import { allOrders } from "../UserOrdersAll/UserOrdersAll";
import { Link, useLocation } from "react-router-dom";

const UserOrdersNew = () => {
  // const [userOrders, setUserOrders] = useState({});

  //   const navigate = useNavigate();

  // console.log('userOrders', userOrders);

  const newOrders = allOrders.filter((value) => value.status === "New");
  const location = useLocation();
  console.log(location);

  return (
    <>
      <h3 className={css.title}>My active orders</h3>

      <div>
        {!newOrders ? (
          <p className={css.text}>
            Your orders will be shown here after you buy something
          </p>
        ) : null}
        <Link to="/" className={css.btn}>
          Go to shop
        </Link>
      </div>

      <UserOrdersList elems={newOrders} />

      {/* {!newOrders ? (
      <div>
<p className={css.text}>Your orders will be shown here after you buy something</p>
<a href='/' className={css.btn}>Go to shop</a>
      </div>
      ) : (
        <UserOrdersList elems={newOrders}/>
      )} */}
    </>
  );
};

export default UserOrdersNew;
