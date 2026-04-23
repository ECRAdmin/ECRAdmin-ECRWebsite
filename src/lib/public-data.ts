import type { Locale } from "@/lib/locale";
import { localize } from "@/lib/locale";
import {
  buildInquiryMessage,
  cityPages,
  faqs,
  offers,
  publicFaq,
  publicVehicleSummary,
  services,
  siteConfig,
  vehicles,
} from "@/lib/site-data";

export function getPublicCompanyInfo(locale: Locale) {
  return {
    companyName: localize(locale, siteConfig.company.name),
    tagline: localize(locale, siteConfig.company.tagline),
    description: localize(locale, siteConfig.company.description),
    phone: siteConfig.company.phoneDisplay,
    whatsapp: siteConfig.company.whatsapp,
    email: siteConfig.company.email,
    address: localize(locale, siteConfig.company.address),
  };
}

export function getPublicServiceAreas(locale: Locale) {
  return siteConfig.serviceAreas.map((item) => localize(locale, item));
}

export function getPublicFleet(locale: Locale) {
  return vehicles.map((vehicle) => publicVehicleSummary(locale, vehicle));
}

export function getPublicVehicleDetails(locale: Locale, slug: string) {
  const vehicle = vehicles.find((item) => item.slug === slug);
  if (!vehicle) return null;

  return {
    ...publicVehicleSummary(locale, vehicle),
    seoDescription: localize(locale, vehicle.seoDescription),
    whatsappUrl: buildInquiryMessage(locale, localize(locale, vehicle.name)),
  };
}

export function getPublicStartingPrices(locale: Locale) {
  return vehicles.map((vehicle) => ({
    slug: vehicle.slug,
    name: localize(locale, vehicle.name),
    dailyFrom: vehicle.dailyFrom,
    monthlyFrom: vehicle.monthlyFrom,
  }));
}

export function getPublicRequirements(locale: Locale) {
  return {
    resident: {
      title: localize(locale, siteConfig.requirements.resident.title),
      items: siteConfig.requirements.resident.items.map((item) =>
        localize(locale, item),
      ),
    },
    tourist: {
      title: localize(locale, siteConfig.requirements.tourist.title),
      items: siteConfig.requirements.tourist.items.map((item) =>
        localize(locale, item),
      ),
    },
  };
}

export function getPublicFaq(locale: Locale) {
  return publicFaq(locale);
}

export function getPublicOffers(locale: Locale) {
  return offers.map((offer) => ({
    slug: offer.slug,
    name: localize(locale, offer.name),
    summary: localize(locale, offer.summary),
    priceFrom: offer.priceFrom,
    vehicles: offer.vehicleSlugs
      .map((slug) => getPublicVehicleDetails(locale, slug))
      .filter(Boolean),
  }));
}

export function getPublicContactChannels(locale: Locale) {
  return {
    companyName: localize(locale, siteConfig.company.name),
    phone: siteConfig.company.phoneDisplay,
    whatsapp: siteConfig.company.whatsapp,
    email: siteConfig.company.email,
    inquiryUrl: buildInquiryMessage(locale),
  };
}

export function getPublicSiteIndex(locale: Locale) {
  return {
    company: getPublicCompanyInfo(locale),
    serviceAreas: getPublicServiceAreas(locale),
    services: services.map((service) => ({
      slug: service.slug,
      name: localize(locale, service.name),
      summary: localize(locale, service.summary),
    })),
    cities: cityPages.map((city) => ({
      slug: city.slug,
      name: localize(locale, city.name),
      summary: localize(locale, city.summary),
    })),
    offers: getPublicOffers(locale),
    faqCount: faqs.length,
  };
}
