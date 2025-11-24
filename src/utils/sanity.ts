import { createClient } from "@sanity/client";
import { env } from "cloudflare:workers";

export const config = {
  dataset: "production",
  projectId: env.SANITY_PROJECT_ID,
  apiVersion: "2021-08-11", // or today's date for latest
  /**
   * Set useCdn to `false` if your application require the freshest possible
   **/
  useCdn: false,
};

export const sanityClient = createClient(config);
