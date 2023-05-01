import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import {MapRegion} from '../interfaces';
import HomeScreen from '../screens/HomeScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';
import HotelsMapScreen from '../screens/HotelsMapScreen';

// routes
export enum NavigationRoute {
  appStack = 'appStack',
  homeScreen = 'homeScreen',
  placeDetailsScreen = 'placeDetailsScreen',
  hotelsMapScreen = 'hotelsMapScreen',
}

interface PlaceDetailsScreenProps {
  cid: number;
  pid: number;
}

interface HotelsMapScreenProps {
  cid: number;
  pid: number;
  mapRegion: MapRegion;
}

export type AppStackNavigatorParams = {
  [NavigationRoute.homeScreen]: undefined;
  [NavigationRoute.placeDetailsScreen]: PlaceDetailsScreenProps;
  [NavigationRoute.hotelsMapScreen]: HotelsMapScreenProps;
};

// home screen
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  AppStackNavigatorParams,
  NavigationRoute.homeScreen
>;

// place details screen
export type PlaceDetailsScreenNavigationProp = NativeStackNavigationProp<
  AppStackNavigatorParams,
  NavigationRoute.placeDetailsScreen
>;

export type PlaceDetailsScreenRouteProp = RouteProp<
  AppStackNavigatorParams,
  NavigationRoute.placeDetailsScreen
>;

// hotels map screen
export type HotelsMapScreenNavigationProp = NativeStackNavigationProp<
  AppStackNavigatorParams,
  NavigationRoute.hotelsMapScreen
>;

export type HotelsMapScreenRouteProp = RouteProp<
  AppStackNavigatorParams,
  NavigationRoute.hotelsMapScreen
>;

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationRoute.homeScreen}
        component={HomeScreen}
        options={{
          headerTitle: 'Asia',
          headerTintColor: 'white',
          headerLargeTitle: true,
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name={NavigationRoute.placeDetailsScreen}
        component={PlaceDetailsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={NavigationRoute.hotelsMapScreen}
        component={HotelsMapScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
