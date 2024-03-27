import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Security, useOktaAuth } from "@okta/okta-react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const oktaAuth = new OktaAuth({
  clientId: import.meta.env.VITE_CLIENT_ID,
  issuer: import.meta.env.VITE_ISSUER,
  redirectUri: window.location.origin + "/login/callback",
  pkce: true,
  scopes: ["openid", "profile", "email", "role:app", "organization:read"],
});

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  context: {
    queryClient,
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
  defaultPreload: "intent", // hovering a link will trigger a preload of the data
  routeTree,
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
            queryClient,
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
      <QueryClientProvider client={queryClient}>
        <InnerApp />
      </QueryClientProvider>
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
