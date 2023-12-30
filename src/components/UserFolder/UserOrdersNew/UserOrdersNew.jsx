import css from "./UserOrdersNew.module.scss";
import UserOrdersList from "../UserOrdersList/UserOrdersList";
import { allOrders } from "../UserOrdersAll/UserOrdersAll";
import { Link } from "react-router-dom";

const UserOrdersNew = () => {
  const newOrders = allOrders.filter((value) => value.status === "New");

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

      <UserOrdersList elements={newOrders} />
    </>
  );
};

export default UserOrdersNew;
