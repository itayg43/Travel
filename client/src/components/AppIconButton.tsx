import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  contentContainerStyle?: StyleProp<ViewStyle>;
  icon: string;
  onPress: () => void;
}

const AppIconButton = ({contentContainerStyle, icon, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, contentContainerStyle]}
      onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={20} color="white" />
    </TouchableOpacity>
  );
};

export default AppIconButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black',
  },
});
