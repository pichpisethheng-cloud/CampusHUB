export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function formatDistance(distanceKm: number, isKhmer: boolean = false): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return isKhmer ? `${meters} ម៉ែត្រ` : `${meters} m`;
  }
  return isKhmer ? `${distanceKm.toFixed(1)} គ.ម` : `${distanceKm.toFixed(1)} km`;
}

export function getEstimatedTime(distanceKm: number, isKhmer: boolean = false): {
  walk: string;
  scooter: string;
} {
  // Walking avg: 4.8 km/h -> 1 km takes 12.5 mins
  const walkMinutes = Math.max(1, Math.round(distanceKm * 12.5));
  // Scooter in Phnom Penh city traffic avg: 22 km/h -> 1 km takes 2.7 mins
  const scooterMinutes = Math.max(1, Math.round(distanceKm * 2.7));

  return {
    walk: isKhmer ? `ដើរ ~${walkMinutes} នាទី` : `~${walkMinutes}m walk`,
    scooter: isKhmer ? `ម៉ូតូ ~${scooterMinutes} នាទី` : `~${scooterMinutes}m moto`,
  };
}
