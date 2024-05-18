import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/Routes';

const StoreScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.store>
> = ({route}) => {
  const {storeUrl} = route.params;
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        style={styles.webview}
        source={{uri: storeUrl}}
        onLoadEnd={() => setLoading(false)}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default StoreScreen;
