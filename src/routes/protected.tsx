import { useOktaAuth } from "@okta/okta-react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Logout } from "../components/Logout";
import { queryOptions } from "@tanstack/react-query";
import { searchOrganizations } from "../searchOrganizations";

export const Route = createFileRoute("/protected")({
  loader: ({ context: { queryClient, auth } }) =>
    queryClient.ensureQueryData(
      queryOptions({
        queryKey: [
          "organizations",
          auth.authState?.accessToken?.claims["organizationIds"],
        ],
        enabled: Array.isArray(
          auth.authState?.accessToken?.claims["organizationIds"]
        ),
        queryFn: () =>
          searchOrganizations(
            auth.authState?.accessToken?.accessToken ?? "",
            auth.authState?.accessToken?.claims["organizationIds"] as string[] // we ensure this is an array in the 'enabled' function
          ),
      })
    ),
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
  const { records } = Route.useLoaderData();
  return (
    <>
      <h1>
        Hello {authState?.idToken?.claims.name} <Logout />
      </h1>

      <h2>Organizations</h2>
      <ul>
        {records.map(({ commercialName }) => (
          <li key={commercialName}>{commercialName}</li>
        ))}
      </ul>
    </>
  );
}
