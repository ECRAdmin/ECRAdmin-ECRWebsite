import { branchType } from "@/sanity/schemaTypes/branchType";
import { cityType } from "@/sanity/schemaTypes/cityType";
import { faqType } from "@/sanity/schemaTypes/faqType";
import { guideType } from "@/sanity/schemaTypes/guideType";
import { offerType } from "@/sanity/schemaTypes/offerType";
import { partnershipProgramType } from "@/sanity/schemaTypes/partnershipProgramType";
import { serviceType } from "@/sanity/schemaTypes/serviceType";
import { siteSettingsType } from "@/sanity/schemaTypes/siteSettingsType";
import { testimonialType } from "@/sanity/schemaTypes/testimonialType";
import { vehicleType } from "@/sanity/schemaTypes/vehicleType";
import { bookingType } from "@/sanity/schemaTypes/bookingType";
import { rateLimitType } from "@/sanity/schemaTypes/rateLimitType";

export const schemaTypes = [
  siteSettingsType,
  vehicleType,
  bookingType,
  rateLimitType,
  cityType,
  serviceType,
  offerType,
  faqType,
  guideType,
  branchType,
  partnershipProgramType,
  testimonialType,
];
