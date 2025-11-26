import type { CatName } from "@/types/types";

export const indexRouteSEO = [
  {
    title: "Kattenparadijs",
  },
  {
    name: "description",
    content: "Foto's van al onze katten",
  },
  {
    property: "og:title",
    content: "Kattenparadijs",
  },
  {
    property: "og:description",
    content: "Foto's van al onze katten",
  },
  {
    property: "og:image",
    content:
      "https://user-images.githubusercontent.com/76665118/210135017-7d48fad3-49db-47da-9ac3-d45d5b358174.png",
  },
];

export const videosRouteSEO = [
  {
    title: "Kattenparadijs | Videos",
  },
  {
    name: "description",
    content: "Bekijk alle video's van onze katten",
  },
  {
    property: "og:title",
    content: "Kattenparadijs | Videos",
  },
  {
    property: "og:description",
    content: "Bekijk alle video's van onze katten",
  },
  {
    property: "og:image",
    content:
      "https://user-images.githubusercontent.com/76665118/210135017-7d48fad3-49db-47da-9ac3-d45d5b358174.png",
  },
];

export function getCatRouteSEO(cat: string) {
  return [
    {
      title: `Kattenparadijs | ${cat[0].toUpperCase() + cat.slice(1)}`,
    },
    {
      name: "description",
      content: `Bekijk alle foto's van ${cat === "all" ? "onze katten" : cat[0].toUpperCase() + cat.slice(1)}`,
    },
    {
      property: "og:title",
      content: `Kattenparadijs | ${cat[0].toUpperCase() + cat.slice(1)}`,
    },
    {
      property: "og:description",
      content: `Bekijk alle foto's van ${cat === "all" ? "onze katten" : cat[0].toUpperCase() + cat.slice(1)}`,
    },
    {
      property: "og:image",
      content: ogImages[cat as CatName],
    },
  ];
}

const ogImages: Record<CatName | "all", string> = {
  all: "https://user-images.githubusercontent.com/76665118/210135017-7d48fad3-49db-47da-9ac3-d45d5b358174.png",
  norris:
    "https://kattenparadijs.bremm.dev/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe991dsae%2Fproduction%2F92e0eeeeea41b32476afc39d5da4d4362617b51e-1200x1600.jpg&w=640&q=75",
  moos: "https://kattenparadijs.bremm.dev/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe991dsae%2Fproduction%2Fb28bb4b619123c5d657fb5e01204b6ac1cb8efd4-1536x2048.jpg&w=828&q=75",
  daantje:
    "https://kattenparadijs.bremm.dev/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe991dsae%2Fproduction%2F28fa09b34211bda594d0c8d51a18e6282ebe23cb-1200x1600.jpg&w=640&q=75",
  flynn:
    "https://kattenparadijs.bremm.dev/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe991dsae%2Fproduction%2F5b9fc1c4970fa7ce993d1f9b1352e30ce4c2eae1-1536x2048.jpg&w=828&q=75",
};
