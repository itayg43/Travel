import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Marker} from 'react-native-maps';

import {LatLng} from '../types';

interface Props {
  coordinate: LatLng;
  isSelected: boolean;
  onPress: () => void;
}

const MapHotelMarker = ({coordinate, isSelected, onPress}: Props) => {
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <MaterialCommunityIcons
        name="bed"
        size={30}
        color={isSelected ? 'blue' : 'black'}
      />
    </Marker>
  );
};

export default MapHotelMarker;
