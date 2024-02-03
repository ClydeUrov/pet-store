import css from "./Users.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useAdminActions } from "../../../helpers/user.actions";
import UserTable from "./UserTable";
import Loader from "../../Loader/Loader";

const Users = () => {
  const adminAction = useAdminActions()
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const users = await adminAction.users(page);
      setAllUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [adminAction, page]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={css.userContainer}>
      <div className={css.firstLine}>
        <p>Users</p>
        <></>
      </div>
      {loading ? (
        <Loader />
      ) : !allUsers || allUsers.length === 0 ? (
        <h1>No data</h1>
      ) : (
        <UserTable setPage={setPage} allUsers={allUsers} adminAction={adminAction} fetchUsers={fetchUsers} />
      )}
      
    </div>
  );
};

export default Users;
