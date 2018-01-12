//below we are using functions from 'react' and 'react-router-dom' and directly importing the App function we created from src > App.js.
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../../App";

//Below we are directing all data from the App component to two specific routes, which 'switch' the url to dislpay one of two pathnames.  
const Routes = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/:id" component={App} />
      </Switch>
    </div>
  </Router>
);

//Below we are exporting the Routes function for use in the neighboring index.js file. 
export default Routes;
