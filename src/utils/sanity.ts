import { createClient } from "@sanity/client";

export const config = {
  dataset: "production",
  projectId: process.env.SANITY_PROJECT_ID,
  apiVersion: "2021-08-11", // or today's date for latest
  /**
   * Set useCdn to `false` if your application require the freshest possible
   **/
  useCdn: false,
};

export const sanityClient = createClient(config);
