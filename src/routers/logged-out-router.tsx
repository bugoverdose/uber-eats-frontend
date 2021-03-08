import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // HashRouter는 url에 #가 보이지만 배포하기는 더 쉬움.
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";
import { NotFound } from "./404";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
// Switch : 한번에 한개의 Route만 render해주는 기능
// exact 필수. ex) path="/"는 /를 포함하는 모든 경로를 의미. /~~~
// 순서 중요: 404 목적의 Route를 path 없이 맨 마지막에 설정. 어떤 경로에도 걸리지 않으면 NotFound Route로 가도록.
