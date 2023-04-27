import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {countriesData, Country, emptyCountry} from '../constants/countriesData';
import {
  HomeScreenNavigationProp,
  NavigationRoute,
} from '../navigation/AppStackNavigator';
import SafeView from '../components/SafeView';
import CountryList from '../components/CountryList';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [countries, setCountries] = useState<Country[]>([
    {...emptyCountry, id: -1},
    ...countriesData,
    {...emptyCountry, id: -2},
  ]);

  return (
    <SafeView>
      <ScrollView>
        <View>
          {/** countries */}
          <CountryList data={countries} />

          {/** places */}
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
