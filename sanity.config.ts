import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { hasSanityConfig, sanityEnv } from "./src/lib/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: sanityEnv.studioTitle,
  projectId: sanityEnv.projectId ?? "demo1234",
  dataset: sanityEnv.dataset ?? "production",
  basePath: "/studio",
  plugins: hasSanityConfig ? [structureTool()] : [],
  schema: {
    types: schemaTypes,
  },
});
