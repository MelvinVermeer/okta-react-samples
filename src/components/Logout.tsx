import { useOktaAuth } from "@okta/okta-react";

export const Logout = () => {
  const { oktaAuth } = useOktaAuth();

  const logout = async () => {
    await oktaAuth.signOut();
  };

  return <button onClick={logout}>Logout</button>;
};
