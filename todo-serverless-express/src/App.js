import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Todo from './components/Todo';
import { loadUser } from './slices/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoutes from './components/routing/PrivateRoutes'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthToken(localStorage.token);
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <PrivateRoutes exact path="/" component={Todo}></PrivateRoutes>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signin" component={Signin}></Route>
      </Switch>
    </Router>
  );
};

export default App;
