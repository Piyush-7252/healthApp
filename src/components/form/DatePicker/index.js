import React from 'react';
import dayjs from 'dayjs';
import {Controller} from 'react-hook-form';
import {useTheme} from 'react-native-paper';
import {DatePickerInput} from 'react-native-paper-dates';
import Typography from '../../Typography';
import TextLabel from '../TextLabel';

const CustomDatePicker = ({
  label,
  register,
  setValue,
  defaultValue,
  control,
  required,
  style = {},
  textLabel,
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <Controller
      control={control}
      {...register}
      render={({field, fieldState: {error}}) => {
        const {onChange, onBlur, value} = field;

        const handleChange = date => {
          onChange(date);
          setValue(field.name, date);
        };

        return (
          <>
            <DatePickerInput
              locale="en"
              label={textLabel}
              value={value}
              onChange={handleChange}
              inputMode="start"
              style={{paddingHorizontal: 0, marginBottom: 8, ...style}}
              {...restProps}
              theme={{
                calendar: {
                  background: theme.colors.background,
                  textSectionTitleColor: theme.colors.text,
                  selectedDayBackgroundColor: theme.colors.primary,
                  selectedDayTextColor: theme.colors.background,
                  todayTextColor: theme.colors.primary,
                  dayTextColor: theme.colors.text,
                  textDisabledColor: theme.colors.disabled,
                  dotColor: theme.colors.primary,
                  selectedDotColor: theme.colors.background,
                  arrowColor: theme.colors.primary,
                },
                textDayFontFamily: 'monospace',
                textMonthFontFamily: 'monospace',
                textDayHeaderFontFamily: 'monospace',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
            {error && (
              <Typography style={{color: theme.colors.error}}>
                {error.message}
              </Typography>
            )}
          </>
        );
      }}
    />
  );
};

export default CustomDatePicker;