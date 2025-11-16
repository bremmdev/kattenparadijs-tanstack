import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/flynn")({
  component: FlynnPage,
});

function FlynnPage() {
  return <div>Hello "/flynn"!</div>;
}
