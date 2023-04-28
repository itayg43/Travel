import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  countriesData,
  Country,
  emptyCountry,
  emptyPlace,
  Place,
} from '../constants/countriesData';
import {
  HomeScreenNavigationProp,
  NavigationRoute,
} from '../navigation/AppStackNavigator';
import SafeView from '../components/SafeView';
import CountryList from '../components/CountryList';
import PlaceList from '../components/PlaceList';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [countries, setCountries] = useState<Country[]>([
    {...emptyCountry, id: -1},
    ...countriesData,
    {...emptyCountry, id: -2},
  ]);

  const [places, setPlaces] = useState<Place[]>([
    {...emptyPlace, id: -1},
    ...countriesData[0].places,
    {...emptyPlace, id: -2},
  ]);

  const handleCountrySelection = useCallback(
    (index: number) => {
      setPlaces([
        {...emptyPlace, id: -1},
        ...countriesData[index].places,
        {...emptyPlace, id: -2},
      ]);
    },
    [setPlaces],
  );

  const handlePlaceSelection = useCallback(
    (place: Place) => {
      navigation.navigate(NavigationRoute.placeDetailsScreen, {place});
    },
    [navigation],
  );

  return (
    <SafeView>
      <ScrollView>
        {/** countries */}
        <CountryList
          contentContainerStyle={styles.countryList}
          items={countries}
          onSelectItem={handleCountrySelection}
        />

        {/** places */}
        <PlaceList
          contentContainerStyle={styles.placeList}
          items={places}
          onSelectItem={handlePlaceSelection}
        />
      </ScrollView>
    </SafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  countryList: {},

  placeList: {
    marginTop: 20,
  },
});
