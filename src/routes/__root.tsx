import { IOktaContext } from "@okta/okta-react/bundles/types/OktaContext";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface MyRouterContext {
  queryClient: QueryClient;
  auth: IOktaContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Root />,
});

const Root = () => {
  return <Outlet />;
};
