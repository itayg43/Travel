import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import {countriesData, Country, emptyCountry} from '../constants/countriesData';
import SafeView from '../components/SafeView';
import CountryList from '../components/CountryList';

const HomeScreen = () => {
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
          <CountryList
            contentContainerStyle={styles.countryList}
            items={countries}
          />

          {/** places */}
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  countryList: {},
});
