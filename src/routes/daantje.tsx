import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/daantje")({
  component: DaantjePage,
});

function DaantjePage() {
  return <div>Hello "/daantje"!</div>;
}
