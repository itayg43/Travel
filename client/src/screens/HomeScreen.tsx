import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Place} from '../interfaces';
import countriesService from '../services/countriesService';
import placesService from '../services/placesService';
import {
  HomeScreenNavigationProp,
  NavigationRoute,
} from '../navigation/AppStackNavigator';
import SafeView from '../components/SafeView';
import CountryList from '../components/CountryList';
import PlaceList from '../components/PlaceList';

const countries = countriesService.getCountries();

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [places, setPlaces] = useState<Place[]>(countries[0].places);

  const handleCountrySelection = useCallback(
    (index: number) => {
      setPlaces(countries[index].places);
    },
    [setPlaces],
  );

  const handlePlaceSelection = useCallback(
    (place: Place) => {
      navigation.navigate(NavigationRoute.placeDetailsScreen, {
        cid: place.cid,
        pid: place.id,
      });
    },
    [navigation],
  );

  return (
    <SafeView safeContainerStyle={styles.safeContaienr}>
      <ScrollView>
        {/** countries */}
        <CountryList
          items={[
            countriesService.getStartCountrySpacer(),
            ...countries,
            countriesService.getEndCountrySpacer(),
          ]}
          onSelectItem={handleCountrySelection}
        />

        {/** places */}
        <PlaceList
          contentContainerStyle={styles.placeList}
          items={[
            placesService.getStartPlaceSpacer(),
            ...places,
            placesService.getEndPlaceSpacer(),
          ]}
          onSelectItem={handlePlaceSelection}
        />
      </ScrollView>
    </SafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeContaienr: {
    backgroundColor: 'black',
  },

  placeList: {
    marginTop: 20,
  },
});
