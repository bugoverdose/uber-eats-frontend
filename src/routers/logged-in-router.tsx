import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useLoggedInUser } from "../hooks/useLoggedInUser-hook";
import { NotFound } from "./404";
import { Restaurants } from "./client/restaurants";
import { ConfirmEmail } from "./user/confirm-email";
import { EditProfile } from "./user/edit-profile";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile" exact>
    <EditProfile />
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
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
