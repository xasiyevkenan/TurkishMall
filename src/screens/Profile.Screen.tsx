import React, {useState, useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/Routes';
import {NavigationParamList} from 'types/navigation.types';
import {WebViewComponent} from 'components/main/WebView';
import {useFocusEffect} from '@react-navigation/native';
import {useLanguage} from 'contexts/LanguageContext';

export const ProfileScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.profile>
> = ({navigation, route}) => {
  const {language: routeLanguage} = route?.params || {};
  const {language: contextLanguage} = useLanguage();
  const language = routeLanguage || contextLanguage; // Fallback to contextLanguage if routeLanguage is undefined
  const initialUrl = `https://cfex.az/${language}/user/panel`;
  const [userId, setUserId] = useState('');
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [webViewKey, setWebViewKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setUserId('');
      setCurrentUrl(initialUrl);
      setWebViewKey(prevKey => prevKey + 1);
    }, [initialUrl]),
  );

  console.log(currentUrl, 'language');

  return (
    <WebViewComponent
      initialUrl={initialUrl}
      currentUrl={currentUrl}
      userId={userId}
      navigation={navigation}
      navigationStateChangeUrl={`https://cfex.az/${language}/user/panel`}
      setUserId={setUserId}
      setCurrentUrl={setCurrentUrl}
      mode="single"
      webViewKey={webViewKey}
    />
  );
};
