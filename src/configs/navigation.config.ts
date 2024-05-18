import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const defaultScreenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    orientation: 'portrait',
    contentStyle: {
        backgroundColor: '#fff',
    },
};

export const mainStackScreenOption: NativeStackNavigationOptions = {
    ...defaultScreenOptions,
    contentStyle: {
        backgroundColor: "#fff",
    },
};
