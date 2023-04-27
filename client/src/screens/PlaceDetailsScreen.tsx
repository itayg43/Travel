import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  PlaceDetailsScreenNavigationProp,
  PlaceDetailsScreenRouteProp,
} from '../navigation/AppStackNavigator';
import SafeView from '../components/SafeView';

const PlaceDetailsScreen = () => {
  const navigation = useNavigation<PlaceDetailsScreenNavigationProp>();
  const route = useRoute<PlaceDetailsScreenRouteProp>();

  return (
    <SafeView contentContainerStyle={styles.container}>
      <Text>Place Details</Text>
    </SafeView>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
