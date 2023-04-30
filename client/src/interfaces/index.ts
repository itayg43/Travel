import {ImageURISource} from 'react-native/types';

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
  id: number;
  name: string;
  description: string;
  image: ImageURISource;
  rate: string;
  mapInitialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  hotels: Hotel[];
}

export interface Country {
  id: number;
  name: string;
  image: ImageURISource;
  places: Place[];
}
