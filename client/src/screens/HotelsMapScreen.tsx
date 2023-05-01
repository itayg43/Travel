import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  HotelsMapScreenNavigationProp,
  HotelsMapScreenRouteProp,
} from '../navigation/AppStackNavigator';
import {Hotel} from '../interfaces';
import hotelsService from '../services/hotelsService';
import AppButton from '../components/AppButton';
import AppIconButton from '../components/AppIconButton';
import MapHotelMarker from '../components/MapHotelMarker';

const HotelsMapScreen = () => {
  const navigation = useNavigation<HotelsMapScreenNavigationProp>();
  const route = useRoute<HotelsMapScreenRouteProp>();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const handleGetHotels = useCallback(
    (cid: number, pid: number) => {
      const hotelsData = hotelsService.getHotelsByCidAndPid(cid, pid);
      if (!hotelsData) return;
      setHotels(hotelsData);
      setSelectedHotel(hotelsData[0]);
    },
    [setHotels],
  );

  const handleHotelSelection = useCallback(
    (hotel: Hotel) => {
      setSelectedHotel(hotel);
    },
    [setSelectedHotel],
  );

  useEffect(() => {
    handleGetHotels(route.params.cid, route.params.pid);
  }, [route.params, handleGetHotels]);

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <MapView
        style={styles.mapContainer}
        initialRegion={route.params.mapRegion}>
        {hotels.map((h, i) => (
          <MapHotelMarker
            key={i}
            coordinate={h.latlng}
            isSelected={h.id === selectedHotel?.id}
            onPress={() => handleHotelSelection(h)}
          />
        ))}
      </MapView>

      {/** back button */}
      <AppIconButton
        contentContainerStyle={styles.backButton}
        icon="close"
        onPress={handleNavigateBack}
      />

      {selectedHotel && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailsInnerContainer}>
            <Image
              style={styles.image}
              source={selectedHotel.image}
              resizeMode="cover"
            />

            {/** details */}
            <View style={styles.detailsInnerContainerRightSection}>
              {/** name */}
              <Text style={styles.name}>{selectedHotel.name}</Text>

              {/** rating */}
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{selectedHotel.rate}</Text>
                <MaterialCommunityIcons name="star" size={20} color="orange" />
              </View>

              <View style={styles.actionButtonAndPriceContainer}>
                {/** action button */}
                <AppButton
                  contentContainerStyle={styles.actionButton}
                  label="Details"
                />

                {/** price */}
                <Text style={styles.price}>
                  Starts from: {selectedHotel.price}$
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default HotelsMapScreen;

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '100%',
  },

  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },

  detailsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 10,
  },
  detailsInnerContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  image: {
    width: 120,
    height: '100%',
  },
  detailsInnerContainerRightSection: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rating: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  actionButtonAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 10,
  },
  price: {
    fontSize: 16,
    color: '#ccc',
  },
});
