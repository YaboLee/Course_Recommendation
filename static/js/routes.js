import React from 'react';
import { HashRouter, Route, hashHistory } from 'react-router-dom';
import Home from './components/home';
import Register from './components/register/register';
import Login from './components/login/login'

// import more components
export default (
    <HashRouter history={hashHistory}>
     <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
     </div>
    </HashRouter>
);
