import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Security, useOktaAuth } from "@okta/okta-react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";

const oktaAuth = new OktaAuth({
  clientId: import.meta.env.VITE_CLIENT_ID,
  issuer: import.meta.env.VITE_ISSUER,
  redirectUri: window.location.origin + "/callback",
  pkce: false,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});

function InnerApp() {
  const auth = useOktaAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <Security
      oktaAuth={oktaAuth}
      restoreOriginalUri={async (oktaAuth, originalUri) => {
        // In React StrictMode, the following warning will be logged to the console:
        // Two custom restoreOriginalUri callbacks are detected.
        // The one from the OktaAuth configuration will be overridden by
        // the provided restoreOriginalUri prop from the Security component.
        router.update({
          context: {
            auth: {
              oktaAuth,
              authState: oktaAuth.authStateManager.getAuthState(),
            },
          },
        });
        await router.navigate({
          to: toRelativeUrl(originalUri || "/", window.location.origin),
          replace: true,
        });
      }}
    >
      <InnerApp />
    </Security>
  );
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
