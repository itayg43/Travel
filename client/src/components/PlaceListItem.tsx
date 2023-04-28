import React from 'react';
import {Animated, View, StyleSheet, Image, Text} from 'react-native';

import {Place} from '../constants/countriesData';
import AppButton from './AppButton';

interface Props {
  width: number;
  emptyWidth: number;
  height: Animated.AnimatedInterpolation<string | number>;
  opacity: Animated.AnimatedInterpolation<string | number>;
  item: Place;
  onSelect: () => void;
}

const PlaceListItem = ({
  width,
  emptyWidth,
  height,
  opacity,
  item,
  onSelect,
}: Props) => {
  return item.id < 0 ? (
    <View style={{width: emptyWidth}} />
  ) : (
    <Animated.View style={[styles.container, {width, height, opacity}]}>
      <Image style={styles.image} source={item.image} resizeMode="cover" />

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>

        <AppButton
          contentContainerStyle={styles.button}
          label="Explore"
          onPress={onSelect}
        />
      </View>
    </Animated.View>
  );
};

export default PlaceListItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },

  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  detailsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  name: {
    color: 'white',
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    width: 150,
  },
});
