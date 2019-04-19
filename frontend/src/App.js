import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./components/home";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Stat from "./components/stat/stat"

// import more components
const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth/register" component={Register} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/stat" component={Stat} />
    </div>
  </Router>
);

export default App;