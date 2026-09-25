export const ACCESS_AREAS = [
  {
    title: "Entrance & approach",
    points: ["Step-free entrance", "Ramp access", "Automatic doors", "Wide doorways (80cm+)"],
  },
  {
    title: "Inside the venue",
    points: ["Turning space (150cm+)", "Lift access", "Quiet environment", "Powered wheelchair suitable"],
  },
  {
    title: "Toilets",
    points: ["Accessible toilet", "Changing Places toilet"],
  },
  {
    title: "Parking & support",
    points: ["Nearby Blue Badge parking", "Staff disability awareness"],
  },
] as const;


export function completeVenueFeatures(features: Record<string, "yes" | "no" | "unknown">) {
  const result = { ...features };
  for (const area of ACCESS_AREAS) {
    for (const key of area.points) result[key] ??= "unknown";
  }
  return result;
}
