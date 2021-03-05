import { useReactiveVar } from "@apollo/client";
import React from "react";
import { LoggedOutRouter } from "./routers/logged-out-router";
import { LoggedInRouter } from "./routers/logged-in-router";
import { isLoggedInVar } from "./apollo";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar); // gql문 없이 해당 local only field에 직접 접근 + 업데이트되면 re-render되는 Hook.
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
