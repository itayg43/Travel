export type LatLng = {
  latitude: number;
  longitude: number;
};

export type MapRegion = LatLng & {
  latitudeDelta: number;
  longitudeDelta: number;
};
