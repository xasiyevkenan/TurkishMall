import React, {useCallback, useState} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/Routes';
import {NavigationParamList} from 'types/navigation.types';
import {WebViewComponent} from 'components/main/WebView';
import {useFocusEffect} from '@react-navigation/native';
import {useLanguage} from 'contexts/LanguageContext';

export const OtherScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.other>
> = ({navigation, route}) => {
  const {storeUrl} = route?.params;

  const {language} = route?.params ? route?.params : useLanguage();
  const initialUrl = storeUrl ? storeUrl : `https://cfex.az/${language}/stores`;
  const [userId, setUserId] = useState<string>('');
  const [currentUrl, setCurrentUrl] = useState<string>(
    initialUrl.replace(/\/(az|en|ru)\//, `/${language}/`),
  );
  const [webViewKey, setWebViewKey] = useState<number>(0);

  console.log(storeUrl, 'store');

  useFocusEffect(
    useCallback(() => {
      setUserId('0');
      setWebViewKey(prevKey => prevKey + 1);
    }, []),
  );

  return (
    <WebViewComponent
      initialUrl={initialUrl}
      currentUrl={currentUrl}
      userId={userId}
      navigation={navigation}
      navigationStateChangeUrl="https://cfex.az/"
      setUserId={setUserId}
      setCurrentUrl={setCurrentUrl}
      mode="multi"
      webViewKey={webViewKey}
    />
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
