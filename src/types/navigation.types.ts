import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {Routes} from 'router/routes';

export type AppNavigation = NativeStackNavigationProp<NavigationParamList>;

export type NavigationParamList = {
  [Routes.home]: {
    storeUrl?: string | undefined;
    userId?: string;
    language?: string | undefined;
  };
  [Routes.store]: {
    storeUrl?: string;
    userId?: string;
    language?: string | undefined;
  };
  [Routes.basket]: {
    storeUrl?: string;
    userId?: string;
    language?: string | undefined;
  };
  [Routes.profile]: {
    storeUrl?: string;
    userId?: string;
    language?: string | undefined;
  };
  [Routes.other]: {
    storeUrl?: string;
    userId?: string;
    language?: string | undefined;
  };
  [Routes.tabRouter]: undefined;
};
