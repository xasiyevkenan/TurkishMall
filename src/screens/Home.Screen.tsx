import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/Routes';
import {NavigationParamList} from 'types/navigation.types';

const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>
> = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState('https://turkishmall.com/');

  const handleOpenWindow = (syntheticEvent: any) => {
    const {nativeEvent} = syntheticEvent;
    const {targetUrl} = nativeEvent;
    setCurrentUrl(targetUrl);
  };

  const handleNavigationStateChange = (navState: any) => {
    const {url} = navState;
    setCurrentUrl(url);

    if (!url.includes('turkishmall.com')) {
      navigation.navigate(Routes.store, {storeUrl: url});
      return false;
    }
    return true;
  };

  const handleShouldStartLoad = () => {
    console.log(currentUrl);

    if (!currentUrl.includes('turkishmall.com')) {
      navigation.navigate(Routes.store, {storeUrl: currentUrl});
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        style={styles.webview}
        source={{uri: currentUrl}}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        onOpenWindow={handleOpenWindow}
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

export default HomeScreen;
