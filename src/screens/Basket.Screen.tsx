import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import WebView from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/Routes';
import {NavigationParamList} from 'types/navigation.types';

export const BasketScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.basket>
> = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'https://turkishmall.com/ru/user/orders'}}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  webview: {
    flex: 1,
  } as ViewStyle,
});
