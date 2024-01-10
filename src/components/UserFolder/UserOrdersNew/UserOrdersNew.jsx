import css from "./UserOrdersNew.module.scss";
import UserOrdersList from "../UserOrdersList/UserOrdersList";
import { allOrders } from "../UserOrdersAll/UserOrdersAll";
import { Link } from "react-router-dom";

const UserOrdersNew = () => {
  const newOrders = allOrders.filter((value) => value.status === "New");

  return (
    <>
      <Link to="/" className={css.btn}>
        Go to shop
      </Link>
      <h3 className={css.title}>My active orders</h3>

      <div className={css.wrapper}>
        {!newOrders ? (
          <p className={css.text}>
            Your orders will be shown here after you buy something
          </p>
        ) : null}
      </div>

      <UserOrdersList elements={newOrders} />
    </>
  );
};

export default UserOrdersNew;
