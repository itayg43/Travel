import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MapView, {Marker} from 'react-native-maps';

import {Hotel, Place} from '../interfaces';
import placesService from '../services/placesService';
import {
  PlaceDetailsScreenNavigationProp,
  PlaceDetailsScreenRouteProp,
} from '../navigation/AppStackNavigator';
import AppIconButton from '../components/AppIconButton';
import AppButton from '../components/AppButton';

const DIMENSIONS = Dimensions.get('window');

const PlaceDetailsScreen = () => {
  const navigation = useNavigation<PlaceDetailsScreenNavigationProp>();
  const route = useRoute<PlaceDetailsScreenRouteProp>();

  const slidingUpPanelRef = useRef<SlidingUpPanel>(null);

  const [place, setPlace] = useState<Place | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleGetPlace = useCallback(
    (cid: number, id: number) => {
      const placeData = placesService.getPlaceByCidAndId(cid, id);
      if (!placeData) return;
      setPlace(placeData);
      setSelectedHotel(placeData.hotels[0]);
    },
    [setPlace],
  );

  const handleHotelSelection = useCallback(
    (hotel: Hotel) => {
      setSelectedHotel(currentHotel =>
        currentHotel?.id !== hotel.id ? hotel : currentHotel,
      );
    },
    [setSelectedHotel],
  );

  const handleCloseSlidingUpPanel = useCallback(() => {
    slidingUpPanelRef.current?.hide();
  }, []);

  useEffect(() => {
    const {cid, id} = route.params;
    handleGetPlace(cid, id);
  }, [route.params, handleGetPlace]);

  return (
    <>
      {place && (
        <>
          <ImageBackground style={styles.imageBackground} source={place.image}>
            {/** go back */}
            <AppIconButton
              contentContainerStyle={styles.backIconButton}
              icon="keyboard-backspace"
              onPress={handleNavigateBack}
            />

            {/** details */}
            <View style={styles.detailsContainer}>
              {/** name & rating */}
              <View style={styles.nameAndRatingContainer}>
                {/** name */}
                <Text style={styles.name}>{place.name}</Text>

                {/** rating */}
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>{place.rate}</Text>
                  <MaterialCommunityIcons
                    name="star"
                    size={20}
                    color="orange"
                  />
                </View>
              </View>

              {/** description */}
              <Text style={styles.description}>{place.description}</Text>

              <AppButton
                contentContainerStyle={styles.bookFlightButton}
                labelColor="black"
                iconColor="black"
                label="Book a flight"
                icon="airplane"
                onPress={() => {}}
              />
            </View>
          </ImageBackground>

          <SlidingUpPanel
            ref={slidingUpPanelRef}
            draggableRange={{
              top: DIMENSIONS.height + 120,
              bottom: 120,
            }}
            showBackdrop={false}
            snappingPoints={[DIMENSIONS.height + 120]}
            height={DIMENSIONS.height + 120}>
            <View style={{flex: 1, backgroundColor: 'transparent'}}>
              {/** header */}
              <View
                style={{
                  height: 120,
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="arrow-up"
                  size={20}
                  color="white"
                />
                <Text style={{color: 'white', fontSize: 14}}>
                  SWIPE FOR DETAILS
                </Text>
              </View>

              {/** content */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MapView
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  initialRegion={place.mapInitialRegion}>
                  {place.hotels.map((h, i) => (
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
                    top: 10,
                    left: 10,
                  }}>
                  <AppIconButton
                    contentContainerStyle={styles.backIconButton}
                    icon="keyboard-backspace"
                    onPress={handleCloseSlidingUpPanel}
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
                  <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                    Hotels in {place.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                    }}>
                    {selectedHotel && (
                      <>
                        <Image
                          style={{
                            width: 90,
                            height: 120,
                            borderRadius: 10,
                          }}
                          source={selectedHotel.image}
                          resizeMode="cover"
                        />

                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            marginLeft: 10,
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
                            <Text style={styles.rating}>
                              {selectedHotel.rate}
                            </Text>
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
              </View>
            </View>
          </SlidingUpPanel>
        </>
      )}
    </>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },

  backIconButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 1,
  },

  detailsContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    marginBottom: 90,
  },
  nameAndRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
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
  description: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  bookFlightButton: {
    backgroundColor: 'white',
    marginTop: 20,
  },
});
