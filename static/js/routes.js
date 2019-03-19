import React from 'react';
import { HashRouter, Route, hashHistory } from 'react-router-dom';
import Home from './components/home';
import Register from './components/register/register';

// import more components
export default (
    <HashRouter history={hashHistory}>
     <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register} />
     </div>
    </HashRouter>
);
