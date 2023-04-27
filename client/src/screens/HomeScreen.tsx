import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';

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
          <CountryList items={countries} />

          {/** places */}
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default HomeScreen;
