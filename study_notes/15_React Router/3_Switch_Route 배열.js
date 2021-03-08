/*
  <Switch>는 자녀로 <Route>만 지닐 수 있음.
  - <></> 같은 fragment가 오면 안됨?
  - <Redirect />는 가능

  조건에 따라 다른 Route들에 접근가능하게 하려면 Route들의 배열 사용.
*/
// Good Code
const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
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
