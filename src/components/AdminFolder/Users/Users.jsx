import css from "./Users.module.scss";
import { useEffect, useState } from "react";
import { useAdminActions } from "../../../helpers/user.actions";
import UserTable from "./UserTable";
import Loader from "../../Loader/Loader";

const Users = () => {
  const adminAction = useAdminActions()
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await adminAction.users();
        setAllUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [adminAction]);

  return (
    <div className={css.userContainer}>
      <div className={css.firstLine}>
        <p>Users</p>
        <></>
      </div>
      {!allUsers || allUsers.length === 0 ? (
        <Loader />
      ) : (
        <UserTable allUsers={allUsers} adminAction={adminAction} />
      )}
      
    </div>
  );
};

export default Users;
