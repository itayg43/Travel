import React from 'react';
import {Animated, View, StyleSheet} from 'react-native';

import {Country} from '../constants/countriesData';

interface Props {
  width: number;
  opacity: Animated.AnimatedInterpolation<string | number>;
  mapSize: Animated.AnimatedInterpolation<string | number>;
  textSize: Animated.AnimatedInterpolation<string | number>;
  item: Country;
}

const CountryListItem = ({width, opacity, mapSize, textSize, item}: Props) => {
  return item.id < 0 ? (
    <View style={{width}} />
  ) : (
    <Animated.View style={[styles.container, {width, opacity}]}>
      <Animated.Image
        style={{width: mapSize, height: mapSize}}
        source={item.image}
        resizeMode="contain"
      />

      <Animated.Text style={[styles.text, {fontSize: textSize}]}>
        {item.name}
      </Animated.Text>
    </Animated.View>
  );
};

export default CountryListItem;

const styles = StyleSheet.create({
  container: {
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 3,
  },
});
