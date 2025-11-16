import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: CatsPage });

function CatsPage() {
  return <div className="font-medium">test</div>;
}
