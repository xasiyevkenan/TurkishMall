import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import HomeIcon from 'assets/vectors/home.svg';
import BasketIcon from 'assets/vectors/basket.svg';
import ProfileIcon from 'assets/vectors/profile.svg';
import {normalize} from 'theme/metrics';
import {Routes} from 'router/Routes';

export const defaultScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const tabBarShadowStyle = () => {
  return Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: normalize('height', 2)},
      shadowOpacity: 0.9,
      shadowRadius: normalize('width', 10),
    },
    android: {
      elevation: normalize('height', 10),
    },
  });
};

export const mainTabNavigatorOptions: BottomTabNavigationOptions = {
  ...defaultScreenOptions,
  tabBarItemStyle: {
    borderTopLeftRadius: normalize('width', 20),
    borderTopRightRadius: normalize('width', 20),
  },
  tabBarLabelStyle: {
    fontSize: normalize('font', 12),
    fontWeight: 'bold',
  },
  tabBarStyle: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: normalize('width', 20),
    borderTopRightRadius: normalize('width', 20),
    ...tabBarShadowStyle(),
  },
  tabBarActiveBackgroundColor: '#00997D',
  tabBarActiveTintColor: 'white',
  tabBarInactiveTintColor: 'black',
};

export const getTabBarIcon = (
  routeName: string,
  focused: boolean,
  size: number,
) => {
  let iconColor = focused ? 'white' : 'black';
  let iconSize = focused
    ? normalize('width', size + 3)
    : normalize('width', size);
  if (routeName === Routes.home) {
    return <HomeIcon color={iconColor} height={iconSize} width={iconSize} />;
  } else if (routeName === Routes.basket) {
    return <BasketIcon color={iconColor} height={iconSize} width={iconSize} />;
  } else if (routeName === Routes.profile) {
    return <ProfileIcon color={iconColor} height={iconSize} width={iconSize} />;
  }
};
