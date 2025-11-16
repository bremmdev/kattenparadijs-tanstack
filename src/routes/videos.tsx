import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/videos")({
  component: VideosPage,
});

function VideosPage() {
  return <div>Hello "/videos"!</div>;
}
