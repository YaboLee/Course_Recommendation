import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./components/home";
import Register from "./components/register/register";
import Login from "./components/login/login";

// import more components
const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth/register" component={Register} />
      <Route exact path="/auth/login" component={Login} />
    </div>
  </Router>
);

export default App;