import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/all")({
  component: AllCatsPage,
});

function AllCatsPage() {
  return <div>Hello "/all"!</div>;
}
