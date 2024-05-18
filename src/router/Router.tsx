import React from 'react';
import {MainRouter} from './Main.Router';
import {NavigationContainer} from '@react-navigation/native';

const Router = () => {
  return (
    <NavigationContainer>
      <MainRouter />
    </NavigationContainer>
  );
};

export default Router;
