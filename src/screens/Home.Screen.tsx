import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, ActivityIndicator, ViewStyle} from 'react-native';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/Routes';
import {NavigationParamList} from 'types/navigation.types';

export const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>
> = ({navigation, route}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUrl, setCurrentUrl] = useState('https://turkishmall.com/');
  const [userId, setUserId] = useState('');

  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (route.params && route.params.storeUrl !== currentUrl) {
      navigation.setParams({storeUrl: currentUrl});
    }
  }, [currentUrl]);

  const getUserIDFromMetaTag = `
    if (!window.metaTag) {
      const metaTag = document.querySelector('meta[property="user_id"]');
      if (metaTag) {
        window.metaTag = metaTag;
        window.ReactNativeWebView.postMessage(metaTag.content);
      } else {
        window.ReactNativeWebView.postMessage(null);
      }
    }
  `;

  const runJavaScript = (script: string) => {
    webViewRef.current?.injectJavaScript(script);
  };

  const handleOpenWindow = (syntheticEvent: any) => {
    const {targetUrl} = syntheticEvent.nativeEvent;
    setCurrentUrl(targetUrl);
    return true;
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const {url} = navState;
    setCurrentUrl(url);

    runJavaScript(getUserIDFromMetaTag);

    if (!url.includes('turkishmall.com')) {
      navigation.navigate(Routes.store, {storeUrl: url, userId: userId});
      return false;
    }

    return true;
  };

  const handleMessage = (event: WebViewMessageEvent) => {
    const userIdFromWebView = event.nativeEvent.data;
    setUserId(userIdFromWebView);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{
          uri:
            route.params && route.params.storeUrl
              ? route.params.storeUrl
              : currentUrl,
        }}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        onMessage={handleMessage}
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
  } as ViewStyle,
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  } as ViewStyle,
  webview: {
    flex: 1,
  } as ViewStyle,
});
