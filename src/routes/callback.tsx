import { LoginCallback } from "@okta/okta-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/callback")({
  component: LoginCallback,
});
