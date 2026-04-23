import { cityType } from "@/sanity/schemaTypes/cityType";
import { faqType } from "@/sanity/schemaTypes/faqType";
import { guideType } from "@/sanity/schemaTypes/guideType";
import { offerType } from "@/sanity/schemaTypes/offerType";
import { serviceType } from "@/sanity/schemaTypes/serviceType";
import { siteSettingsType } from "@/sanity/schemaTypes/siteSettingsType";
import { vehicleType } from "@/sanity/schemaTypes/vehicleType";

export const schemaTypes = [
  siteSettingsType,
  vehicleType,
  cityType,
  serviceType,
  offerType,
  faqType,
  guideType,
];
