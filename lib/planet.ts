// Deterministic value-noise + hand-placed continent blobs, used to
// procedurally generate an equirectangular Earth-like texture without
// depending on any external image asset.

function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function valueNoise2D(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);

  const ux = xf * xf * (3 - 2 * xf);
  const uy = yf * yf * (3 - 2 * yf);

  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
}

export function fbm(x: number, y: number, octaves = 4): number {
  let total = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let max = 0;

  for (let i = 0; i < octaves; i++) {
    total += valueNoise2D(x * frequency, y * frequency) * amplitude;
    max += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return total / max;
}

interface Continent {
  lat: number;
  lon: number;
  rLat: number;
  rLon: number;
}

const CONTINENTS: Continent[] = [
  { lat: 48, lon: -100, rLat: 22, rLon: 34 }, // North America
  { lat: 68, lon: -45, rLat: 11, rLon: 13 }, // Greenland
  { lat: -15, lon: -60, rLat: 30, rLon: 17 }, // South America
  { lat: 50, lon: 12, rLat: 14, rLon: 20 }, // Europe
  { lat: 2, lon: 20, rLat: 33, rLon: 20 }, // Africa
  { lat: 55, lon: 90, rLat: 26, rLon: 55 }, // Asia
  { lat: 20, lon: 78, rLat: 12, rLon: 10 }, // India
  { lat: 0, lon: 115, rLat: 10, rLon: 15 }, // Maritime SE Asia
  { lat: -25, lon: 133, rLat: 12, rLon: 15 }, // Australia
];

function wrapLon(deg: number): number {
  let d = deg;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

/** Returns a 0..~1.2 land score for a given lat/lon; > threshold means land. */
export function landScore(lat: number, lon: number): number {
  if (lat < -78) return 1; // Antarctic ice cap

  let score = 0;
  for (const c of CONTINENTS) {
    const dLat = lat - c.lat;
    const dLon = wrapLon(lon - c.lon) * Math.cos((c.lat * Math.PI) / 180);
    const d = Math.sqrt((dLat / c.rLat) ** 2 + (dLon / c.rLon) ** 2);
    const contribution = Math.max(0, 1 - d);
    score = Math.max(score, contribution * contribution);
  }

  const jitter = fbm(lon * 0.06, lat * 0.06, 4) - 0.5;
  return score + jitter * 0.45;
}

export const LAND_THRESHOLD = 0.42;
