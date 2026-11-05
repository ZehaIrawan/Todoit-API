import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../slices/auth';

const Signin = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form className="login-form" onSubmit={(e) => onSubmit(e)}>
        <input
          type="email"
          value={email}
          onChange={(e) => onChange(e)}
          name="email"
          placeholder="Your email"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Your password"
          onChange={(e) => onChange(e)}
        />
        <input type="submit" value="Signin" name="" id="" />
      </form>
    </div>
  );
};

export default Signin;
