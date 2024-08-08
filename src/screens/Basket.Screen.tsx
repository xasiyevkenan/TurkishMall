import React, {useState, useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/Routes';
import {NavigationParamList} from 'types/navigation.types';
import {WebViewComponent} from 'components/main/WebView';
import {useFocusEffect} from '@react-navigation/native';
import {useLanguage} from 'contexts/LanguageContext';

export const BasketScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.basket>
> = ({navigation, route}) => {
  const {language} = route?.params?.language ? route?.params : useLanguage();
  const [userId, setUserId] = useState('');
  const initialUrl = `https://cfex.az/${language}/user/orders`;
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [webViewKey, setWebViewKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setUserId('');
      setCurrentUrl(initialUrl);
      setWebViewKey(prevKey => prevKey + 1);
    }, []),
  );

  return (
    <WebViewComponent
      initialUrl={initialUrl}
      currentUrl={currentUrl}
      userId={userId}
      navigation={navigation}
      navigationStateChangeUrl={`https://cfex.az/${language}/user/orders`}
      setUserId={setUserId}
      setCurrentUrl={setCurrentUrl}
      mode="multi"
      webViewKey={webViewKey}
    />
  );
};
