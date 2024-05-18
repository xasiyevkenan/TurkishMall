import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { Routes } from 'router/routes';

export type AppNavigation = NativeStackNavigationProp<NavigationParamList>;

export type NavigationParamList = {
  [Routes.home]: {
    storeUrl: string | undefined
  };
  [Routes.store]: {
    storeUrl: string
  };
  [Routes.basket]: undefined;
};
