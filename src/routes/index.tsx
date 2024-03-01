import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/protected">Protected</Link>
    </>
  );
}
