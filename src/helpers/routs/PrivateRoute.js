import { Navigate } from 'react-router-dom';
import { getUser } from '../user.actions';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const  isLoggedIn = true;
  
  return !isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export const AdminPrivateRoute = ({ component: Component }) => {
  const user = getUser();
  return user && user.status === 'ACTIVE' && user.role === 'ADMIN' ? (
    Component
  ) : (
    <Navigate to={"/"} />
  );
}
