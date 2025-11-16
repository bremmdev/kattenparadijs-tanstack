import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/moos")({
  component: MoosPage,
});

function MoosPage() {
  return <div>Hello "/moos"!</div>;
}
