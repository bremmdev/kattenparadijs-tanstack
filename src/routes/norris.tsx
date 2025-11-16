import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/norris")({
  component: NorrisPage,
});

function NorrisPage() {
  return <div>Hello "/norris"!</div>;
}
