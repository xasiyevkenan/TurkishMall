import {
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

type TType = 'active' | 'disabled' | 'loading';

interface IButton {
  title: string;
  onPress?: () => void;
  type: TType;
}

export const Button: React.FC<IButton> = ({
  title,
  onPress,
  type = 'active',
}) => {
  return (
    <Pressable
      style={[styles.button, styles[type]]}
      onPress={type === 'active' ? onPress : null}>
      {type === 'loading' ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#00F162',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  } as ViewStyle,
  buttonText: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  } as ViewStyle,
  active: {
    backgroundColor: '#00F162',
  } as ViewStyle,
  disabled: {
    backgroundColor: '#B8BAB9',
    opacity: 0.5,
  } as ViewStyle,
  loading: {
    backgroundColor: '#00F162',
  } as ViewStyle,
});
