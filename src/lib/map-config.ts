/** MapLibre / Mapbox configuration for the interactive venue finder map */

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?.trim() ?? "";

export const MAP_STYLE = MAPBOX_TOKEN
  ? `https://api.mapbox.com/styles/v1/mapbox/streets-v12?access_token=${MAPBOX_TOKEN}`
  : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export const MAP_ATTRIBUTION = MAPBOX_TOKEN
  ? "© Mapbox © OpenStreetMap"
  : "© OpenStreetMap © CARTO";
