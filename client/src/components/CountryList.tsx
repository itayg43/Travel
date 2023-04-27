import React, {useCallback, useRef} from 'react';
import {StyleSheet, Animated, Dimensions, View} from 'react-native';

import {Country} from '../constants/countriesData';

interface Props {
  items: Country[];
}

const width = Dimensions.get('window').width;

const COUNTRY_ITEM_WIDTH = width / 3;

const calculateInputRange = (index: number) => {
  return [
    (index - 2) * COUNTRY_ITEM_WIDTH,
    (index - 1) * COUNTRY_ITEM_WIDTH,
    index * COUNTRY_ITEM_WIDTH,
  ];
};

const CountryList = ({items}: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleCalculateOpacity = useCallback((index: number) => {
    return scrollX.interpolate({
      inputRange: calculateInputRange(index),
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });
  }, []);

  const handleCalculateMapSize = useCallback((index: number) => {
    return scrollX.interpolate({
      inputRange: calculateInputRange(index),
      outputRange: [25, 80, 25],
      extrapolate: 'clamp',
    });
  }, []);

  const handleCalculateFontSize = useCallback((index: number) => {
    return scrollX.interpolate({
      inputRange: calculateInputRange(index),
      outputRange: [15, 25, 15],
      extrapolate: 'clamp',
    });
  }, []);

  return (
    <Animated.FlatList
      data={items}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => {
        const opacity = handleCalculateOpacity(index);
        const mapSize = handleCalculateMapSize(index);
        const fontSize = handleCalculateFontSize(index);

        if (index === 0 || index === items.length - 1) {
          return <EmptyListItem />;
        }

        return (
          <CountryListItem
            item={item}
            opacity={opacity}
            mapSize={mapSize}
            fontSize={fontSize}
          />
        );
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToAlignment="center"
      snapToInterval={COUNTRY_ITEM_WIDTH}
      scrollEventThrottle={16}
      decelerationRate={0}
      bounces={false}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
          },
        ],
        {useNativeDriver: false},
      )}
    />
  );
};

export default CountryList;

const EmptyListItem = () => {
  return <View style={styles.emptyContaienr} />;
};

interface CountryListItemProps {
  item: Country;
  opacity: Animated.AnimatedInterpolation<string | number>;
  mapSize: Animated.AnimatedInterpolation<string | number>;
  fontSize: Animated.AnimatedInterpolation<string | number>;
}

const CountryListItem = ({
  item,
  opacity,
  mapSize,
  fontSize,
}: CountryListItemProps) => {
  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <Animated.Image
        style={{
          width: mapSize,
          height: mapSize,
        }}
        source={item.image}
        resizeMode="contain"
      />

      <Animated.Text style={[styles.text, {fontSize}]}>
        {item.name}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  emptyContaienr: {
    width: COUNTRY_ITEM_WIDTH,
  },

  container: {
    width: COUNTRY_ITEM_WIDTH,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 3,
  },
});
