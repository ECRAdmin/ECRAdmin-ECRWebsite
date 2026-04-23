import { defineCliConfig } from "sanity/cli";
import { sanityEnv } from "./src/lib/sanity/env";

export default defineCliConfig({
  api: {
    projectId: sanityEnv.projectId ?? "demo1234",
    dataset: sanityEnv.dataset ?? "production",
  },
});
