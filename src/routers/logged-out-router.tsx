import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // HashRouter는 url에 #가 보이지만 배포하기는 더 쉬움.
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
// Switch : 한번에 한개의 Route만 render할 수 있게 해주는 기능
// "/create-account" 라우트가 "/" 라우트보다 위에 존재해야 함.
