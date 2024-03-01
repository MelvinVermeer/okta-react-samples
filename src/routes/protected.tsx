import { useOktaAuth } from "@okta/okta-react";
import { createFileRoute } from "@tanstack/react-router";
import { RequiredAuth } from "../RequiredAuth";

export const Route = createFileRoute("/protected")({
  component: () => (
    <RequiredAuth>
      <Protected />
    </RequiredAuth>
  ),
});

const Protected = () => {
  const { authState } = useOktaAuth();
  return (
    <>
      <h1>Hello {authState?.idToken?.claims.name}</h1>
      <pre>{JSON.stringify(authState?.idToken, null, 2)}</pre>
    </>
  );
};
