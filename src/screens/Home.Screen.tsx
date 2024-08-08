import React, {useState, useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/Routes';
import {NavigationParamList} from 'types/navigation.types';
import {WebViewComponent} from 'components/main/WebView';
import {useFocusEffect} from '@react-navigation/native';
import {useLanguage} from 'contexts/LanguageContext';

export const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>
> = ({navigation, route}) => {
  const {language} = route?.params ? route?.params : useLanguage();
  const initialUrl = `https://cfex.az/${language}`;
  const [userId, setUserId] = useState('');
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [webViewKey, setWebViewKey] = useState(0);
  const {language: Salam} = useLanguage();

  console.log(route?.params?.language, 'param');
  console.log(Salam, 'sala');

  useFocusEffect(
    useCallback(() => {
      setUserId('');
      setCurrentUrl(initialUrl);
      setWebViewKey(prevKey => prevKey + 1);
    }, []),
  );

  console.log(language, 'home');
  console.log(language, 'home');
  console.log(language, 'home');

  return (
    <WebViewComponent
      initialUrl={initialUrl}
      currentUrl={currentUrl}
      userId={userId}
      navigation={navigation}
      navigationStateChangeUrl={`https://cfex.az/${language}`}
      setUserId={setUserId}
      setCurrentUrl={setCurrentUrl}
      mode="multi"
      webViewKey={webViewKey}
    />
  );
};
