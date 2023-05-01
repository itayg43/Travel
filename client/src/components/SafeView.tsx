import React, {ReactNode} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface Props {
  children: ReactNode;
  safeContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const SafeView = ({
  children,
  safeContainerStyle,
  contentContainerStyle,
}: Props) => {
  return (
    <SafeAreaView style={[styles.safeAreaContaienr, safeContainerStyle]}>
      <View style={[styles.contentContaienr, contentContainerStyle]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default SafeView;

const styles = StyleSheet.create({
  safeAreaContaienr: {
    flex: 1,
  },

  contentContaienr: {
    flex: 1,
  },
});
