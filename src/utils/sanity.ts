import { createClient } from "@sanity/client";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: "e991dsae",
  apiVersion: "2021-08-11", // or today's date for latest
  /**
   * Set useCdn to `false` if your application require the freshest possible
   **/
  useCdn: false,
};

export const sanityClient = createClient(config);
