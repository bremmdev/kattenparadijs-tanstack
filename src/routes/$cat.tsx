import { createFileRoute, notFound } from "@tanstack/react-router";

const ALLOWED_ROUTES = ["all", "daantje", "flynn", "moos", "norris"];

export const Route = createFileRoute("/$cat")({
  component: CatPage,
  loader: async ({ params }) => {
    const { cat } = params;

    if (!ALLOWED_ROUTES.includes(cat)) {
      throw notFound();
    }

    return { cat };
  },
});

function CatPage() {
  const { cat } = Route.useLoaderData();

  return <div>Hello {cat}</div>;
}
