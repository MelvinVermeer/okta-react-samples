import OktaAuth, { toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";

const oktaAuth = new OktaAuth({
  clientId: import.meta.env.VITE_CLIENT_ID,
  issuer: import.meta.env.VITE_ISSUER,
  redirectUri: window.location.origin + "/callback",
  pkce: true,
});

export const Route = createRootRoute({
  component: () => <Root />,
});

const Root = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = async (_: OktaAuth, originalUri: string) => {
    navigate({
      to: toRelativeUrl(originalUri || "/", window.location.origin),
      replace: true,
    });
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Outlet />
    </Security>
  );
};
