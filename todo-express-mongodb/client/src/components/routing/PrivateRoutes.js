import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const loading = useSelector((state) => state.auth.loading);

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          'Loading...'
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
