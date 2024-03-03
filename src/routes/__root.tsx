import { IOktaContext } from "@okta/okta-react/bundles/types/OktaContext";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface MyRouterContext {
  auth: IOktaContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Root />,
});

const Root = () => {
  return <Outlet />;
};
