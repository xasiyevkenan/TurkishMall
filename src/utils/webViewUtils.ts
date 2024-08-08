import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Dispatch, RefObject, SetStateAction} from 'react';
import WebView from 'react-native-webview';
import {Routes} from 'router/Routes';
import {NavigationParamList} from 'types/navigation.types';

export const getUserId = `
  (function() {
    if (!window.metaTag) {
      const metaTag = document.querySelector('meta[property="user_id"]');
      if (metaTag) {
        window.metaTag = metaTag;
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(metaTag.content);
        }
      } else {
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(null);
        }
      }
    }
    return true; 
  })();
`;

export const removeTargetBlank = `
  (function() {
    const links = document.querySelectorAll('a[target="_blank"]');
    links.forEach(link => link.removeAttribute('target'));
    return true; 
  })();
`;

export const runJavaScript = (
  webViewRef: RefObject<WebView>,
  script: string,
) => {
  webViewRef.current?.injectJavaScript(script);
};

export const handleNavigationStateChange = (
  navState: any,
  setCurrentUrl: Dispatch<SetStateAction<string>>,
  runJavaScript: (script: string) => void,
  navigation: NativeStackNavigationProp<NavigationParamList>,
  userId: string,
  redirectUrl: string,
) => {
  const {url} = navState;
  setCurrentUrl(url);

  runJavaScript(getUserId);
  runJavaScript(removeTargetBlank);

  if (!url.includes('cfex.az')) {
    setCurrentUrl(redirectUrl);
    navigation.navigate(Routes.store, {storeUrl: url, userId: userId});
    return false;
  }

  return true;
};

export const handleMessage = (
  event: any,
  setUserId: Dispatch<SetStateAction<string>>,
) => {
  const userIdFromWebView = event.nativeEvent.data;
  setUserId(userIdFromWebView);
};
