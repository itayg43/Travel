import {ImageURISource} from 'react-native/types';

import {LatLng, MapRegion} from '../types';

export interface Hotel {
  id: string;
  name: string;
  image: ImageURISource;
  rate: number;
  price: number;
  latlng: LatLng;
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
