import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";

import { Route, useHistory } from "react-router-dom";
import {
  Security,
  SecureRoute,
  LoginCallback,
  useOktaAuth,
} from "@okta/okta-react";

const oktaAuth = new OktaAuth({
  clientId: import.meta.env.VITE_CLIENT_ID,
  issuer: import.meta.env.VITE_ISSUER,
  redirectUri: window.location.origin + "/callback",
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
  const history = useHistory();
  const restoreOriginalUri = async (_: OktaAuth, originalUri: string) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Route path="/" exact component={Home} />
      <SecureRoute path="/protected" component={Protected} />
      <Route path="/callback" component={LoginCallback} />
    </Security>
  );
}

export default App;
