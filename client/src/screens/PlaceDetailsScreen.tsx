import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ImageBackground, View, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  NavigationRoute,
  PlaceDetailsScreenNavigationProp,
  PlaceDetailsScreenRouteProp,
} from '../navigation/AppStackNavigator';
import {Place} from '../interfaces';
import placesService from '../services/placesService';
import AppIconButton from '../components/AppIconButton';
import AppButton from '../components/AppButton';

const PlaceDetailsScreen = () => {
  const navigation = useNavigation<PlaceDetailsScreenNavigationProp>();
  const route = useRoute<PlaceDetailsScreenRouteProp>();

  const [place, setPlace] = useState<Place | null>(null);

  const handleGetPlace = useCallback(
    (cid: number, id: number) => {
      const placeData = placesService.getPlaceByCidAndId(cid, id);
      if (!placeData) return;
      setPlace(placeData);
    },
    [setPlace],
  );

  useEffect(() => {
    handleGetPlace(route.params.cid, route.params.pid);
  }, [route.params, handleGetPlace]);

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNavigateToHotelsMapScreen = useCallback(() => {
    if (!place) return;
    navigation.navigate(NavigationRoute.hotelsMapScreen, {
      cid: place.cid,
      pid: place.id,
      mapRegion: place.mapInitialRegion,
    });
  }, [navigation, place]);

  return (
    <>
      {place && (
        <ImageBackground
          style={styles.backgroundContainer}
          source={place.image}>
          {/** back button */}
          <AppIconButton
            contentContainerStyle={styles.backButton}
            icon="arrow-left"
            onPress={handleNavigateBack}
          />

          <View style={styles.contentContainer}>
            {/** name & rating */}
            <View style={styles.nameAndRatingContainer}>
              {/** name */}
              <Text style={styles.name}>{place.name}</Text>

              {/** rating */}
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{place.rate}</Text>
                <MaterialCommunityIcons name="star" size={20} color="orange" />
              </View>
            </View>

            {/** description */}
            <Text style={styles.description}>{place.description}</Text>

            {/** action buttons */}
            <View style={styles.actionButtonsContainer}>
              <AppButton
                contentContainerStyle={styles.actionButton}
                label="Book a Flight"
                icon="airplane"
                onPress={() => {}}
              />

              <AppButton
                contentContainerStyle={styles.actionButton}
                label="Book an Hotel"
                icon="bed"
                onPress={handleNavigateToHotelsMapScreen}
              />
            </View>
          </View>
        </ImageBackground>
      )}
    </>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    width: '100%',
    height: '100%',
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 1,
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    marginBottom: 30,
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

  actionButtonsContainer: {
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: 'white',
    marginVertical: 5,
  },
});
