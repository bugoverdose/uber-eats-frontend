/*
  <Switch>는 자녀로 <Route> & <Redirect />만 지닐 수 있음.
  - <></> 같은 fragment가 오면 안됨?
  
  조건에 따라 다른 Route들에 접근가능하게 하려면 Route들의 배열 사용.
  - 다만 배열 사용하는 경우 key 지정 필요.
*/
// Good Code
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
  // ~~
  return (
    <Router>
      <Switch>
        {data.loggedInUser.role === "Client" && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
// =================================================================
// Bad Code
const ClientRoutes = () => (
  <>
    <Route path="/" exact>
      <Restaurants />
    </Route>
  </>
);

export const LoggedInRouter = () => {
  // ~~
  return (
    <Router>
      <Switch>
        {data.loggedInUser.role === "Client" && <ClientRoutes />}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
// =================================================================
