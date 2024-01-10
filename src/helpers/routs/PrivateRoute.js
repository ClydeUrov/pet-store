import { getUser } from "../user.actions";
import Error from "../../components/Error/Error";

export const PrivateRoute = ({ component: Component }) => {
  const user = getUser();
  return user && user.status === "ACTIVE" && user.role === "CLIENT" ? (
    Component
  ) : (
    <Error />
  );
};

export const AdminPrivateRoute = ({ component: Component }) => {
  const user = getUser();
  return user && user.status === "ACTIVE" && user.role === "ADMIN" ? (
    Component
  ) : (
    <Error />
  );
};
