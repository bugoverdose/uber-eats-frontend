import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useLoggedInUser } from "../hooks/useLoggedInUser-hook";
import { NotFound } from "../pages/404";
import { CategoryPage } from "../pages/client/category-page";
import { HomePage } from "../pages/client/home-page";
import { RestaurantPage } from "../pages/client/restaurant-page";
import { Search } from "../pages/client/search";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <HomePage />
  </Route>,
  <Route key={2} path="/confirm">
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile">
    <EditProfile />
  </Route>,
  <Route key={4} path="/search">
    <Search />
  </Route>,
  <Route key={5} path="/category/:slug">
    <CategoryPage />
  </Route>,
  <Route key={6} path="/restaurant/:id">
    <RestaurantPage />
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
