import * as React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import cloneDeep from 'lodash/cloneDeep';
import Loader from 'src/components/Loader';
import Autocomplete from '../../Autocomplete';
import { TextInput } from 'react-native-paper';

const FormAutoComplete = ({
  variant,
  data,
  label,
  register,
  control,
  setValue,
  getOptions = () => {},
  loading,
  onSearch,
  multiple,
  ...restProps
}) => {
  const handleInputChange = React.useCallback(
    (e) => {
      setValue(register?.name, '');
      onSearch(e);
    },
    [onSearch, register?.name, setValue]
  );
  return (
    <Controller
      control={control}
      {...register}
      render={({ field, fieldState: { error } }) => {
        const { ref, onChange, value } = field;
        return (
          <Autocomplete
            size="small"
            id={variant}
            options={data}
            {...field}
            onChange={(newValue) => {
              setValue(register?.name, newValue);
              onChange(newValue);
            }}
            multiple={multiple}
            onFocus={getOptions}
            renderInput={(params) => (
              <TextInput
                {...params}
                label={label || null}
                error={error?.message}
                helperText={error?.message || null}
                required={restProps?.required?.value}
                inputRef={ref}
                onChange={handleInputChange}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: loading ? (
                    <Loader type="circular" size={15} loading={loading} />
                  ) : (
                    params.InputProps.endAdornment
                  ),
                }}
                size="small"
              />
            )}
            {...restProps}
            // eslint-disable-next-line no-nested-ternary
            value={value ? cloneDeep(value) : multiple ? [] : ''}
            sx={{
              '& .MuiFormLabel-root': {
                fontSize: '14px',
              },
            }}
            noOptionsText="Type to search"
          />
        );
      }}
    />
  );
};

FormAutoComplete.defaultProps = {
  variant: 'combo-box-demo',
  data: [],
  label: '',
  register: {},
  error: '',
  getOptions: () => {},
  loading: false,
};

FormAutoComplete.propTypes = {
  variant: PropTypes.string,
  data: PropTypes.instanceOf(Object),
  label: PropTypes.string,
  register: PropTypes.instanceOf(Object),
  error: PropTypes.string,
  getOptions: PropTypes.func,
  loading: PropTypes.bool,
};

export default FormAutoComplete;
