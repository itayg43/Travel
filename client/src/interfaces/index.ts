import {ImageURISource} from 'react-native/types';

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface Hotel {
  id: string;
  name: string;
  image: ImageURISource;
  rate: number;
  price: number;
  latlng: {
    latitude: number;
    longitude: number;
  };
}

export interface Place {
  cid: number;
  id: number;
  name: string;
  description: string;
  image: ImageURISource;
  rate: string;
  mapInitialRegion: MapRegion;
  hotels: Hotel[];
}

export interface Country {
  id: number;
  name: string;
  image: ImageURISource;
  places: Place[];
}
