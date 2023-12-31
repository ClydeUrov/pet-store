import css from "./UserAccount.module.scss";
import UserOrdersNew from "../UserOrdersNew/UserOrdersNew";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { getUser } from "../../../helpers/user.actions";

const UserAccount = () => {
  const user = getUser();

  return (
    <>
      <h3 className={css.title}>Hello, {user.firstName}!</h3>

      <ul className={css.list}>
        <li className={css.item}>
          <p className={css.user__name}>
            {user.firstName} {user.lastName}
          </p>
          <Link to="/user/info" className={css.icon}>
            <GoPencil size={24} />
          </Link>
        </li>
        <li className={css.item}>
          <p>E-mail</p>
          <p className={css.user__info}>{user.email}</p>
        </li>
        <li className={css.item}>
          <p>Date of bithday</p>
          <p className={css.user__info}>
            <span>{user.birthDate},</span>
          </p>
        </li>
      </ul>

      <UserOrdersNew />
    </>
  );
};

export default UserAccount;
