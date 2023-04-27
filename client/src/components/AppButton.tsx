import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface Props {
  contentContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  label: string;
  onPress: () => void;
}

const AppButton = ({
  contentContainerStyle,
  labelStyle,
  label,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, contentContainerStyle]}
      onPress={onPress}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'black',
  },

  label: {
    color: 'white',
    fontWeight: 'bold',
  },
});
