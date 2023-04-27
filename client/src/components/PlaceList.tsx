import React, {useCallback, useRef} from 'react';
import {Animated, Dimensions, StyleProp, View, ViewStyle} from 'react-native';

import {Place} from '../constants/countriesData';
import PlaceListItem from './PlaceListItem';

interface Props {
  contentContainerStyle?: StyleProp<ViewStyle>;
  items: Place[];
}

const DIMENSIONS = Dimensions.get('window');

const PLACE_LIST_ITEM_WIDTH = DIMENSIONS.width / 1.25;
const EMPTY_PLACE_LIST_ITEM_WIDTH =
  (DIMENSIONS.width - PLACE_LIST_ITEM_WIDTH) / 2;

const calculateInputRange = (index: number) => {
  return [
    (index - 2) * PLACE_LIST_ITEM_WIDTH,
    (index - 1) * PLACE_LIST_ITEM_WIDTH,
    index * PLACE_LIST_ITEM_WIDTH,
  ];
};

const PlaceList = ({contentContainerStyle, items}: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleCalculateOpacity = useCallback((index: number) => {
    return scrollX.interpolate({
      inputRange: calculateInputRange(index),
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });
  }, []);

  const handleCalculateHeight = useCallback((index: number) => {
    let height =
      DIMENSIONS.height > 800
        ? DIMENSIONS.height / 2
        : DIMENSIONS.height / 1.65;
    return scrollX.interpolate({
      inputRange: calculateInputRange(index),
      outputRange: [DIMENSIONS.height / 2.25, height, DIMENSIONS.height / 2.25],
      extrapolate: 'clamp',
    });
  }, []);

  const handleRenderPlaceListItem = useCallback(
    (item: Place, index: number) => {
      const opacity = handleCalculateOpacity(index);
      const height = handleCalculateHeight(index);

      return (
        <PlaceListItem
          width={PLACE_LIST_ITEM_WIDTH}
          emptyWidth={EMPTY_PLACE_LIST_ITEM_WIDTH}
          height={height}
          opacity={opacity}
          item={item}
        />
      );
    },
    [handleCalculateOpacity, handleCalculateHeight],
  );

  return (
    <View style={contentContainerStyle}>
      <Animated.FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => handleRenderPlaceListItem(item, index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        contentContainerStyle={{
          alignItems: 'center',
        }}
        snapToInterval={PLACE_LIST_ITEM_WIDTH + 28}
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

export default PlaceList;
