import { createClient } from "next-sanity";
import { hasSanityConfig, sanityEnv } from "@/lib/sanity/env";

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: true,
    })
  : null;

export const writeClient = hasSanityConfig && sanityEnv.token
  ? createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: false,
      token: sanityEnv.token,
    })
  : null;
