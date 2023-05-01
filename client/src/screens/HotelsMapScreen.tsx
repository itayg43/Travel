import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  HotelsMapScreenNavigationProp,
  HotelsMapScreenRouteProp,
} from '../navigation/AppStackNavigator';
import {Hotel} from '../interfaces';
import hotelsService from '../services/hotelsService';
import AppButton from '../components/AppButton';
import AppIconButton from '../components/AppIconButton';

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
        style={{
          width: '100%',
          height: '100%',
        }}
        initialRegion={route.params.mapRegion}>
        {hotels.map((h, i) => (
          <Marker
            key={i}
            coordinate={h.latlng}
            onPress={() => handleHotelSelection(h)}>
            <MaterialCommunityIcons
              name="bed"
              size={30}
              color={selectedHotel?.id === h.id ? 'blue' : 'black'}
            />
          </Marker>
        ))}
      </MapView>

      <View
        style={{
          position: 'absolute',
          top: 5,
          left: 5,
        }}>
        <AppIconButton
          contentContainerStyle={styles.backIconButton}
          icon="close"
          onPress={handleNavigateBack}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          {selectedHotel && (
            <>
              <Image
                style={{
                  width: 120,
                  height: '100%',
                }}
                source={selectedHotel.image}
                resizeMode="cover"
              />

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  {selectedHotel.name}
                </Text>
                <View
                  style={[
                    styles.ratingContainer,
                    {
                      marginTop: 10,
                    },
                  ]}>
                  <Text style={styles.rating}>{selectedHotel.rate}</Text>
                  <MaterialCommunityIcons
                    name="star"
                    size={20}
                    color="orange"
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <AppButton
                    contentContainerStyle={{
                      backgroundColor: 'white',
                      padding: 10,
                    }}
                    label="Details"
                    labelColor="black"
                    onPress={() => {}}
                  />
                  <Text style={{fontSize: 16, color: '#ccc'}}>
                    Starts from: {selectedHotel.price}$
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default HotelsMapScreen;

const styles = StyleSheet.create({
  backIconButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
});
