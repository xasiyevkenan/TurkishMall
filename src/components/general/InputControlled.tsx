import React from 'react';
import {ViewStyle} from 'react-native';
import {Control, useController} from 'react-hook-form';
import {Input, IInput} from './Input';
import {validateInput, inputValidations} from 'utils/formValidation';

type ControlledInputProps = {
  name: string;
  type?: IInput['type'];
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  style?: ViewStyle;
  control: Control<any>;
  submitted: boolean;
};

const ControlledInput: React.FC<ControlledInputProps> = ({
  name,
  type = 'text',
  label,
  placeholder,
  defaultValue = '',
  style,
  control,
  submitted,
}) => {
  const {field, fieldState} = useController({
    name,
    control,
    defaultValue: defaultValue ?? '',
  });

  const getErrorMessage = (value: string): string => {
    const validation = inputValidations[name];
    if (!validation) return '';

    return validateInput(name, value);
  };

  return (
    <Input
      type={type}
      label={label}
      placeholder={placeholder}
      value={field.value}
      setValue={field.onChange}
      errorMessage={submitted ? getErrorMessage(field.value) : undefined}
      style={style}
    />
  );
};

export default ControlledInput;
