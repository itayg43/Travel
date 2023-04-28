import React, {useCallback} from 'react';
import {StyleSheet, ImageBackground, View, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  PlaceDetailsScreenNavigationProp,
  PlaceDetailsScreenRouteProp,
} from '../navigation/AppStackNavigator';
import AppIconButton from '../components/AppIconButton';
import AppButton from '../components/AppButton';

const PlaceDetailsScreen = () => {
  const navigation = useNavigation<PlaceDetailsScreenNavigationProp>();
  const {
    params: {place},
  } = useRoute<PlaceDetailsScreenRouteProp>();

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
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
              <MaterialCommunityIcons name="star" size={20} color="orange" />
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
            onPress={() => null}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

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
    marginBottom: 75,
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
