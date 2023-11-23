import { NavLink, useParams } from "react-router-dom";
import css from "./Users.module.scss";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../redux/user/selectors";

const Users = () => {
  const { userId } = useParams();
  console.log("Users", userId);

  const users = useSelector(selectUsers);

  return (
    <div className={css.userContainer}>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <div className={css.firstLine}>
        <p>Users</p>
        <></>
      </div>
      <NavLink to="123" type="button" className={css.topButton}>
        User 1
      </NavLink>
      <NavLink to="123" type="button" className={css.topButton}>
        User 2
      </NavLink>
      <NavLink to="123" type="button" className={css.topButton}>
        User 3
      </NavLink>
    </div>
  );
};

export default Users;
