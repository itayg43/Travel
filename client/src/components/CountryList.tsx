import React, {useCallback, useRef} from 'react';
import {Animated, Dimensions, StyleProp, View, ViewStyle} from 'react-native';

import {Country} from '../constants/countriesData';
import CountryListItem from './CountryListItem';

interface Props {
  contentContainerStyle?: StyleProp<ViewStyle>;
  items: Country[];
}

const width = Dimensions.get('window').width;

const COUNTRY_LIST_ITEM_WIDTH = width / 3;

const calculateInputRange = (index: number) => {
  return [
    (index - 2) * COUNTRY_LIST_ITEM_WIDTH,
    (index - 1) * COUNTRY_LIST_ITEM_WIDTH,
    index * COUNTRY_LIST_ITEM_WIDTH,
  ];
};

const CountryList = ({contentContainerStyle, items}: Props) => {
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

  const handleRenderCountryListItem = useCallback(
    (item: Country, index: number) => {
      const opacity = handleCalculateOpacity(index);
      const mapSize = handleCalculateMapSize(index);
      const fontSize = handleCalculateFontSize(index);

      return (
        <CountryListItem
          width={COUNTRY_LIST_ITEM_WIDTH}
          opacity={opacity}
          mapSize={mapSize}
          textSize={fontSize}
          item={item}
        />
      );
    },
    [],
  );

  return (
    <View style={contentContainerStyle}>
      <Animated.FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => handleRenderCountryListItem(item, index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={COUNTRY_LIST_ITEM_WIDTH}
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
    </View>
  );
};

export default CountryList;
