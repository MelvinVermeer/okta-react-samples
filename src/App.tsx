import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";

import { Route, Routes, useNavigate } from "react-router-dom";
import { Security, LoginCallback, useOktaAuth } from "@okta/okta-react";
import { RequiredAuth } from "./RequiredAuth";

const oktaAuth = new OktaAuth({
  clientId: import.meta.env.VITE_CLIENT_ID,
  issuer: import.meta.env.VITE_ISSUER,
  redirectUri: window.location.origin + "/callback",
  pkce: true,
});

const Home = () => <h1>Home</h1>;

const Protected = () => {
  const { authState } = useOktaAuth();
  return (
    <>
      <h1>Hello {authState?.idToken?.claims.name}</h1>
      <pre>{JSON.stringify(authState?.idToken, null, 2)}</pre>
    </>
  );
};

function App() {
  const navigate = useNavigate();
  const restoreOriginalUri = async (_: OktaAuth, originalUri: string) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin), {
      replace: true,
    });
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/protected" element={<RequiredAuth />}>
          <Route path="" element={<Protected />} />
        </Route>
        <Route path="/callback" Component={LoginCallback} />
      </Routes>
    </Security>
  );
}

export default App;
