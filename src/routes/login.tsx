import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().catch("/"),
  }),

  beforeLoad: async ({ context: { auth }, search }) => {
    if (auth.authState && !auth.authState.isAuthenticated) {
      await auth.oktaAuth.signInWithRedirect({ originalUri: search.redirect });
    }
  },
});
