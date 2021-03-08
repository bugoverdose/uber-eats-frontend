import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Header } from "../components/header";
import { useLoggedInUser } from "../hooks/useLoggedInUser-hook";
import { Restaurants } from "./client/restaurants";

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  // 최우선: 로그인된 상태면 해당 Router에서 loggedInUser query를 통해 사용자 정보 얻기.
  const { data, loading, error } = useLoggedInUser();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-semibold text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.loggedInUser.role === "Client" && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
