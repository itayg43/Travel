import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import {Place} from '../constants/countriesData';
import HomeScreen from '../screens/HomeScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';

// routes
export enum NavigationRoute {
  appStack = 'appStack',
  homeScreen = 'homeScreen',
  placeDetailsScreen = 'placeDetailsScreen',
}

interface PlaceDetailsScreenProps {
  place: Place;
}

export type AppStackNavigatorParams = {
  [NavigationRoute.homeScreen]: undefined;
  [NavigationRoute.placeDetailsScreen]: PlaceDetailsScreenProps;
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

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationRoute.homeScreen}
        component={HomeScreen}
        options={{
          headerTitle: 'Asia',
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
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
