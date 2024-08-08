import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Routes} from './Routes';
import {HomeScreen} from 'screens/Home.Screen';
import {BasketScreen} from 'screens/Basket.Screen';
import {StoreScreen} from 'screens/Store.Screen';
import {ProfileScreen} from 'screens/Profile.Screen';
import {OtherScreen} from 'screens/Other.Screen';
import {
  mainTabNavigatorOptions,
  getTabBarIcon,
} from 'configs/navigation.config';
import {NavigationParamList} from 'types/navigation.types';
import BootSplash from 'react-native-bootsplash';
import {useLanguage} from 'contexts/LanguageContext';
import {translations} from 'translation';

const Tab = createBottomTabNavigator<NavigationParamList>();

export const MainTabRouter = () => {
  const {language} = useLanguage();
  type LanguageKey = 'az' | 'en' | 'ru';
  const languageForIndex: LanguageKey = (language as LanguageKey) || 'az';
  const t = translations[languageForIndex];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['top']}>
        <NavigationContainer
          onReady={() => BootSplash.hide({fade: true})}
          independent>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({size, focused}) =>
                getTabBarIcon(route.name, focused, size),
              ...mainTabNavigatorOptions,
            })}>
            <Tab.Screen
              name={Routes.profile}
              component={ProfileScreen}
              options={{tabBarLabel: t.profil}}
            />

            <Tab.Screen
              name={Routes.store}
              component={StoreScreen}
              options={{tabBarButton: () => null}}
            />
            <Tab.Screen
              name={Routes.other}
              component={OtherScreen}
              options={{tabBarButton: () => null}}
            />
            <Tab.Screen
              name={Routes.basket}
              component={BasketScreen}
              options={{tabBarLabel: t.orders}}
            />
            <Tab.Screen
              name={Routes.home}
              component={HomeScreen}
              options={{tabBarLabel: t.homePage}}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
