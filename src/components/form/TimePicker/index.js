import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import {TimePickerModal} from 'react-native-paper-dates';

const FormTimePicker = ({
  label,
  register,
  setValue,
  defaultValue,
  control,
  style = {},
  ...restProps
}) => {
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  return (
    <Controller
      control={control}
      {...register}
      render={({field, fieldState: {error}}) => {
        const {ref} = field;
        return (
          <>
            <TextInput
              label={label}
              value={field.value}
              onTouchStart={() => setTimePickerVisible(true)}
              error={error?.message}
              style={{paddingHorizontal: 0,marginBottom: 8, ...style}}
              {...restProps}
            />
            <TimePickerModal
              visible={isTimePickerVisible}
              onDismiss={() => setTimePickerVisible(false)}
              onConfirm={data => {
                const {hours, minutes} = data;
                // Format the selected time
                const selectedTime = dayjs()
                  .set('hour', hours)
                  .set('minute', minutes)
                  .format('hh:mm A');

                const formattedTime = selectedTime;

                setValue(register?.name, formattedTime);
                setTimePickerVisible(false);
              }}
              inputFontSize={40}
              {...restProps}
            />
          </>
        );
      }}
    />
  );
};

FormTimePicker.defaultProps = {
  label: '',
  register: () => {},
  setValue: () => {},
};

FormTimePicker.propTypes = {
  label: PropTypes.string,
  register: PropTypes.func,
  setValue: PropTypes.func,
};

export default FormTimePicker;