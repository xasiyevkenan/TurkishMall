import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainTabRouter} from './Main.Tab.Router';
import {LanguageProvider} from 'contexts/LanguageContext';

const Router = () => {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <MainTabRouter />
      </NavigationContainer>
    </LanguageProvider>
  );
};

export default Router;
