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
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const SafeView = ({children, contentContainerStyle}: Props) => {
  return (
    <SafeAreaView style={styles.safeAreaContaienr}>
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
