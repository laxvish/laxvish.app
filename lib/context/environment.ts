import type { EnvironmentCategoryDensity, EnvironmentModel, LocationConfidenceTier, RepresentativePlace } from "./types.ts";

const DEFAULT_CATEGORIES: EnvironmentCategoryDensity = {
  healthcare: 0.25,
  education: 0.30,
  business: 0.45,
  finance: 0.35,
  government: 0.20,
  retail: 0.40,
  transport: 0.35,
  hospitality: 0.30,
  industrial: 0.25,
  residential: 0.50,
  cultural: 0.20,
};

// Known Indian enterprise hubs for instant zero-latency deterministic category profiling
const REGIONAL_CLUSTER_MAP: Record<string, Partial<EnvironmentCategoryDensity>> = {
  Bengaluru: { business: 0.92, education: 0.70, finance: 0.65, industrial: 0.55 },
  Bangalore: { business: 0.92, education: 0.70, finance: 0.65, industrial: 0.55 },
  Hyderabad: { business: 0.88, healthcare: 0.75, education: 0.60, industrial: 0.60 },
  Mumbai: { finance: 0.95, business: 0.90, retail: 0.80, transport: 0.75 },
  Gurugram: { business: 0.90, finance: 0.82, industrial: 0.65, transport: 0.50 },
  Gurgaon: { business: 0.90, finance: 0.82, industrial: 0.65, transport: 0.50 },
  Noida: { business: 0.80, industrial: 0.75, education: 0.60 },
  Delhi: { government: 0.95, business: 0.85, finance: 0.80, education: 0.75 },
  Chennai: { industrial: 0.88, healthcare: 0.82, business: 0.75, education: 0.70 },
  Pune: { industrial: 0.85, education: 0.80, business: 0.75 },
  Ahmedabad: { industrial: 0.85, business: 0.78, finance: 0.65 },
  Jaipur: { cultural: 0.90, healthcare: 0.65, education: 0.60, business: 0.55 },
  Kolkata: { business: 0.80, cultural: 0.85, finance: 0.70, education: 0.65 },
};

export const KNOWN_CITY_COORDINATES: Array<{ city: string; lat: number; lon: number; maxRadiusKm: number }> = [
  { city: "Bengaluru", lat: 12.9716, lon: 77.5946, maxRadiusKm: 50 },
  { city: "Mumbai", lat: 19.0760, lon: 72.8777, maxRadiusKm: 50 },
  { city: "Delhi", lat: 28.7041, lon: 77.1025, maxRadiusKm: 40 },
  { city: "Gurugram", lat: 28.4595, lon: 77.0266, maxRadiusKm: 30 },
  { city: "Noida", lat: 28.5355, lon: 77.3910, maxRadiusKm: 30 },
  { city: "Hyderabad", lat: 17.3850, lon: 78.4867, maxRadiusKm: 50 },
  { city: "Chennai", lat: 13.0827, lon: 80.2707, maxRadiusKm: 50 },
  { city: "Pune", lat: 18.5204, lon: 73.8567, maxRadiusKm: 45 },
  { city: "Kolkata", lat: 22.5726, lon: 88.3639, maxRadiusKm: 45 },
  { city: "Ahmedabad", lat: 23.0225, lon: 72.5714, maxRadiusKm: 45 },
  { city: "Jaipur", lat: 26.9124, lon: 75.7873, maxRadiusKm: 40 },
];

function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Resolves city name from latitude and longitude by checking proximity to known enterprise hubs.
 */
export function resolveCityFromCoordinates(latitude: number, longitude: number): string | undefined {
  for (const hub of KNOWN_CITY_COORDINATES) {
    const dist = haversineDistanceKm(latitude, longitude, hub.lat, hub.lon);
    if (dist <= hub.maxRadiusKm) {
      return hub.city;
    }
  }
  return undefined;
}

/**
 * Extracts approximate location from incoming edge HTTP request headers
 */
export function extractEdgeLocation(headers: Headers): Partial<EnvironmentModel> {
  const city =
    headers.get("x-vercel-ip-city") ||
    headers.get("cf-ipcity") ||
    headers.get("x-forwarded-city") ||
    undefined;

  const region =
    headers.get("x-vercel-ip-country-region") ||
    headers.get("cf-region") ||
    headers.get("x-forwarded-region") ||
    undefined;

  const country =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-forwarded-country") ||
    "IN";

  const latStr = headers.get("x-vercel-ip-latitude") || headers.get("cf-iplatitude");
  const lonStr = headers.get("x-vercel-ip-longitude") || headers.get("cf-iplongitude");

  const latitude = latStr ? parseFloat(latStr) : undefined;
  const longitude = lonStr ? parseFloat(lonStr) : undefined;

  let confidenceTier: LocationConfidenceTier = "L1";
  let locationConfidence = 0.35;

  if (city && region) {
    confidenceTier = "L2";
    locationConfidence = 0.60;
  } else if (country) {
    confidenceTier = "L1";
    locationConfidence = 0.40;
  }

  const categoryProfile = buildCategoryDensity(city);

  return {
    locationSource: city ? "ip" : "none",
    locationConfidence,
    confidenceTier,
    city: city ? decodeURIComponent(city) : undefined,
    region: region ? decodeURIComponent(region) : undefined,
    country,
    latitude,
    longitude,
    categories: categoryProfile,
    nearestRepresentative: buildRepresentativePlaces(city),
  };
}

/**
 * Resolves environmental category density given exact GPS coordinates
 */
export function buildGpsEnvironmentModel(
  latitude: number,
  longitude: number,
  accuracyMeters: number,
  existingCity?: string
): EnvironmentModel {
  // L4: accuracy <= 50m, L3: accuracy > 50m
  const confidenceTier: LocationConfidenceTier = accuracyMeters <= 50 ? "L4" : "L3";
  const locationConfidence = accuracyMeters <= 50 ? 0.95 : 0.85;

  const resolvedCity = resolveCityFromCoordinates(latitude, longitude) || existingCity;
  const categoryDensity = buildCategoryDensity(resolvedCity);

  return {
    locationSource: "gps",
    locationConfidence,
    confidenceTier,
    city: resolvedCity || "Local Region",
    country: "IN",
    latitude,
    longitude,
    categories: categoryDensity,
    nearestRepresentative: [
      {
        category: "commercial_hub",
        distanceMeters: Math.round(accuracyMeters * 5 + 120),
        densityFactor: categoryDensity.business,
      },
      {
        category: "infrastructure_node",
        distanceMeters: Math.round(accuracyMeters * 10 + 250),
        densityFactor: categoryDensity.industrial,
      },
    ],
  };
}

function buildCategoryDensity(city?: string): EnvironmentCategoryDensity {
  const base = { ...DEFAULT_CATEGORIES };
  if (!city) return base;

  const normalizedCity = city.trim();
  const override = REGIONAL_CLUSTER_MAP[normalizedCity];

  if (override) {
    return { ...base, ...override };
  }
  return base;
}

function buildRepresentativePlaces(city?: string): RepresentativePlace[] {
  if (!city) {
    return [
      { category: "enterprise_corridor", distanceMeters: 800, densityFactor: 0.6 },
    ];
  }

  return [
    { category: `${city} Central Business District`, distanceMeters: 450, densityFactor: 0.85 },
    { category: `${city} Industrial & Logistics Corridor`, distanceMeters: 1200, densityFactor: 0.70 },
  ];
}
