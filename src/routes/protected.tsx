import { useOktaAuth } from "@okta/okta-react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Logout } from "../components/Logout";

export const Route = createFileRoute("/protected")({
  beforeLoad: ({ context, location }) => {
    // In a real world scenario this would probably be a reusable function 'ensureAuthenticated'
    if (!context.auth.authState?.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Protected,
});

function Protected() {
  const { authState } = useOktaAuth();
  return (
    <>
      <h1>
        Hello {authState?.idToken?.claims.name} <Logout />
      </h1>
      <pre>{JSON.stringify(authState?.idToken, null, 2)}</pre>
    </>
  );
}
