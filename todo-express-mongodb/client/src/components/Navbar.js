import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../slices/auth';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const guestLinks = (
    <Fragment>
      <Link to="/">Todo</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/signin">Signin</Link>
    </Fragment>
  );

  const AuthLinks = (
    <Fragment>
      <Link to="/">Todo</Link>
      <Link to="/" onClick={() => dispatch(logout())}>
        Logout
      </Link>
    </Fragment>
  );

  return isAuthenticated ? (
    <nav className="nav-container">{AuthLinks}</nav>
  ) : (
    <nav className="nav-container">{guestLinks}</nav>
  );
};

export default Navbar;
