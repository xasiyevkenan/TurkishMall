import React from 'react';
import {WebView as NativeWebView} from 'react-native-webview';

interface IWebView {
  link: string;
}

export const WebView: React.FC<IWebView> = ({link}) => {
  return <NativeWebView source={{uri: link}} />;
};
