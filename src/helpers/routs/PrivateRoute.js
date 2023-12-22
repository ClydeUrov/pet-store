import { Navigate } from 'react-router-dom';
import { getUser } from '../user.actions';
import Error from '../../components/Error/Error';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const  isLoggedIn = true;
  
  return !isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export const AdminPrivateRoute = ({ component: Component }) => {
  const user = getUser();
  return user && user.status === 'ACTIVE' && user.role === 'ADMIN' ? (
    Component
  ) : (
    <Error />
  );
}
