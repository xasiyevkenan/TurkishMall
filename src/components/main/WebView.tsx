import React, {useRef, useState, Dispatch, SetStateAction} from 'react';
import {View, StyleSheet, ViewStyle, ActivityIndicator} from 'react-native';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {Routes} from 'router/Routes';
import {
  handleMessage,
  handleNavigationStateChange,
  runJavaScript,
} from 'utils/webViewUtils';
import {useLanguage} from 'contexts/LanguageContext';

interface WebViewComponentProps {
  initialUrl: string;
  currentUrl: string;
  userId: string;
  navigation: any;
  navigationStateChangeUrl: string;
  setUserId: Dispatch<SetStateAction<string>>;
  setCurrentUrl: Dispatch<SetStateAction<string>>;
  mode: 'single' | 'multi';
  webViewKey: number;
}

export const WebViewComponent: React.FC<WebViewComponentProps> = ({
  initialUrl,
  currentUrl,
  userId,
  navigation,
  navigationStateChangeUrl,
  setUserId,
  setCurrentUrl,
  mode,
  webViewKey,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const webViewRef = useRef<WebView>(null);
  const {language, setLanguage} = useLanguage();
  const handleNavigation = (navState: WebViewNavigation) => {
    const {url} = navState;

    console.log(url, 'salam');

    const stripLanguagePart = (url: string) => {
      return url.replace(/(\/az|\/en|\/ru)$/, '');
    };

    const strippedInitialUrl = stripLanguagePart(initialUrl);
    const strippedCurrentUrl = stripLanguagePart(currentUrl);
    const strippedNavigatedUrl = stripLanguagePart(url);

    const navigateAway =
      mode === 'single'
        ? strippedInitialUrl !== strippedCurrentUrl
        : strippedInitialUrl !== strippedNavigatedUrl;
    if (navigateAway) {
      const params = {userId, storeUrl: url, language: language};
      console.log(params, 'params');

      if (!url.includes('cfex.az')) {
        navigation.navigate(Routes.store, params);
      } else if (url.includes('user/panel')) {
        console.log('salam');

        navigation.navigate(Routes.profile, params);
      } else if (url.includes('login' || 'logout' || 'register')) {
        navigation.navigate(Routes.other, params);
      } else if (url.includes('user/orders')) {
        navigation.navigate(Routes.basket, params);
      } else if (
        url === 'https://cfex.az/' ||
        url === 'https://cfex.az/en' ||
        url === 'https://cfex.az/ru'
      ) {
        navigation.navigate(Routes.home, params);
      } else {
        navigation.navigate(Routes.other, params);
      }
      setCurrentUrl(initialUrl);
    } else {
      handleNavigationStateChange(
        navState,
        setCurrentUrl,
        script => runJavaScript(webViewRef, script),
        navigation,
        userId,
        navigationStateChangeUrl,
      );
    }
    const languageChange =
      url.includes('/az') || url.includes('/en') || url.includes('/ru');

    if (languageChange) {
      const newLanguage = url.includes('/en')
        ? 'en'
        : url.includes('/ru')
        ? 'ru'
        : 'az';
      setLanguage(newLanguage);

      return;
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00997D" />
        </View>
      )}
      <WebView
        key={webViewKey}
        ref={webViewRef}
        style={styles.webview}
        source={{uri: currentUrl}}
        onLoadEnd={() => setLoading(false)}
        onMessage={event => handleMessage(event, setUserId)}
        onNavigationStateChange={handleNavigation}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00997D" />
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
