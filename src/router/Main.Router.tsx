import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './Routes';
import {HomeScreen} from 'screens/Home.Screen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {mainStackScreenOption} from 'configs/navigation.config';
import {StyleSheet} from 'react-native';
import {StoreScreen} from 'screens/Store.Screen';
import {NavigationParamList} from 'types/navigation.types';
import {BasketScreen} from 'screens/Basket.Screen';

const MainStack = createNativeStackNavigator<NavigationParamList>();

export const MainRouter = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <MainStack.Navigator
          screenOptions={mainStackScreenOption}
          initialRouteName={Routes.home}>
          <MainStack.Screen name={Routes.home} component={HomeScreen} />
          <MainStack.Screen name={Routes.store} component={StoreScreen} />
          <MainStack.Screen name={Routes.basket} component={BasketScreen} />
        </MainStack.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
