import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../../App";

const Routes = () => (
  <Router>
    <div>
     
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
