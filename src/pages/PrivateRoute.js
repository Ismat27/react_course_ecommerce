import React from 'react';
import { Route, Outlet, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
import { useUserContext } from '../context/user_context';
import { Loading } from '../components';

const PrivateRoute = () => {
  const {isAuthenticated, isLoading} = useUserContext()
  if (isLoading) {
    return <Loading />
  }
  if (!isAuthenticated) {
    return <Navigate to={'/'} />
  }
  return (
    <Outlet />
  )
};
export default PrivateRoute;
