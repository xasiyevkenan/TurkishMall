import React from 'react';
import {View, Text, TextInput, StyleSheet, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

type TInput = 'text' | 'select';

export interface IInput {
  type?: TInput;
  placeholder?: string;
  label?: string;
  value?: string;
  setValue?: (value: string) => void;
  errorMessage?: string;
  style?: ViewStyle;
}

export const Input: React.FC<IInput> = ({
  type = 'text',
  placeholder,
  label,
  value,
  errorMessage,
  style,
  setValue,
}) => {
  const renderContent = () => {
    switch (type) {
      case 'text':
        return (
          <View style={styles.root}>
            {label ? (
              <View>
                <Text style={styles.label}>{label}</Text>
              </View>
            ) : null}
            <View>
              <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                style={[styles.input, style]}
              />
            </View>
            {errorMessage ? (
              <View>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              </View>
            ) : null}
          </View>
        );

      case 'select':
        return (
          <View style={styles.root}>
            {label ? (
              <View>
                <Text style={styles.label}>{label}</Text>
              </View>
            ) : null}
            <View style={styles.dropdownInput}>
              <Dropdown
                data={[
                  {label: 'XS', value: 'XS'},
                  {label: 'S', value: 'S'},
                  {label: 'M', value: 'M'},
                  {label: 'L', value: 'L'},
                  {label: 'XL', value: 'XL'},
                  {label: '2XL', value: '2XL'},
                  {label: '3XL', value: '3XL'},
                ]}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={value}
                onChange={item => setValue?.(item.value)}
              />
            </View>
            {errorMessage ? (
              <View>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              </View>
            ) : null}
          </View>
        );
    }
  };

  return renderContent();
};

const styles = StyleSheet.create({
  root: {
    gap: 6,
  },
  label: {
    color: 'black',
    fontSize: 13,
    fontWeight: '700',
    width: '100%',
  } as ViewStyle,
  input: {
    borderWidth: 1,
    padding: 9,
    width: '100%',
    alignSelf: 'center',
    borderColor: 'gray',
    borderRadius: 8,
  } as ViewStyle,
  dropdownInput: {
    borderWidth: 1,
    padding: 9,
    width: '100%',
    borderColor: 'gray',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
  } as ViewStyle,
  errorMessage: {
    fontSize: 13,
    fontWeight: '500',
    width: '100%',
    color: 'red',
  } as ViewStyle,
});
