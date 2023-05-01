import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  contentContainerStyle?: StyleProp<ViewStyle>;
  labelColor?: string;
  iconColor?: string;
  label: string;
  icon?: string;
  onPress: () => void;
}

const AppButton = ({
  contentContainerStyle,
  labelColor = 'black',
  iconColor = 'black',
  label,
  icon,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, contentContainerStyle]}
      onPress={onPress}>
      <Text style={[styles.label, {color: labelColor}]}>{label}</Text>

      {icon && (
        <MaterialCommunityIcons
          style={[styles.icon, {color: iconColor}]}
          name={icon}
        />
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },

  label: {
    color: 'white',
    fontWeight: 'bold',
  },

  icon: {
    marginLeft: 5,
    color: 'white',
    fontSize: 18,
  },
});
