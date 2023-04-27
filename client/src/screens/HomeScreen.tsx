import React, {useCallback} from 'react';
import {StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  HomeScreenNavigationProp,
  NavigationRoute,
} from '../navigation/AppStackNavigator';
import SafeView from '../components/SafeView';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNavigateToPlaceDetails = useCallback(() => {
    navigation.navigate(NavigationRoute.placeDetailsScreen, {
      id: 1,
    });
  }, [navigation]);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <Button
        title="Go To Place Details"
        onPress={handleNavigateToPlaceDetails}
      />
    </SafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
