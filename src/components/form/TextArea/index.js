import React from 'react';
import { TextInput as PaperTextInput, useTheme } from 'react-native-paper';
import { Controller } from 'react-hook-form';

const TextAreaInput = ({ register, control, textLabel, placeholder, ...restProps }) => {
  const theme = useTheme();

  return (
    <Controller
      control={control}
      {...register}
      render={({ field, fieldState: { error } }) => (
        <>
          <PaperTextInput
            mode="outlined"
            multiline
            numberOfLines={3}
            label={textLabel}
            placeholder={placeholder || 'Type your message here'}
            error={!!error}
            style={{ backgroundColor: 'transparent', marginVertical: 8 }}
            {...restProps}
            {...field}
          />
          {error && <Text style={{ color: theme.colors.error, fontSize: 12 }}>{error?.message}</Text>}
        </>
      )}
    />
  );
};

export default TextAreaInput;
