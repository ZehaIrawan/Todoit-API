import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const { email, password, passwordConfirmation } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, passwordConfirmation);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
          onChange={(e) => onChange(e)}
          placeholder="Your password"
        />
        <input
          type="password"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => onChange(e)}
          placeholder="Confirm your password"
        />
        <input type="submit" value="Signup" name="" id="" />
      </form>
    </div>
  );
};

export default Signup;
