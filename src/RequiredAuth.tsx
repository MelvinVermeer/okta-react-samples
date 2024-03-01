import { toRelativeUrl } from "@okta/okta-auth-js";
import { Outlet } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect } from "react";

export const RequiredAuth: React.FC = () => {
  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (!authState || !authState?.isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};
