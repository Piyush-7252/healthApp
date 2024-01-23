import isFunction from 'lodash/isFunction';
import React, {useCallback, useState} from 'react';
import {Controller} from 'react-hook-form';
import {HelperText} from 'react-native-paper';
import {PaperSelect} from 'react-native-paper-select';
import palette from '../../../theme/palette';

const FormSelect = ({
  variant,
  data = [],
  label,
  register,
  control,
  setValue,
  loading,
  onSearch,
  onChange: handleChange = () => {},
  defaultValue,
  valueAccessor = 'value',
  labelAccessor = 'label',
  getOptionLabel = () => {},
  multiple,
  options,
  validateSelection,
  sx,
  extraAPIParams,
  style={},
  ...restProps
}) => {
  const [selectedValues, setSelectedValues] = useState({
    text: '',
    selectedList: [],
  });

  const handleValidateSelection = useCallback(
    (selected, onChange) => {
      if (isFunction(validateSelection)) {
        const isSelectionValid = validateSelection(selected, restProps);
        if (isSelectionValid) {
          setSelectedValues(selected);
          handleChange(register?.name, selected.selectedList);
          onChange(selected.selectedList);
        }
      } else {
        setSelectedValues(selected);
        handleChange(register?.name, selected.selectedList);
        onChange(selected.selectedList);
      }
    },
    [handleChange, register?.name, restProps, validateSelection],
  );

  return (
    <Controller
      control={control}
      {...register}
      render={({field, fieldState: {error}}) => {
        const {onChange} = field;
        return (
          <>
            <PaperSelect
              label={label}
              arrayList={data || []}
              multiEnable={multiple}
              checkboxProps={{checkboxLabelStyle: {color: palette.text.dark}}}
              selectedArrayList={selectedValues.selectedList}
              onSelection={selected =>
                handleValidateSelection(selected, onChange)
              }
              value={selectedValues.text}
              textInputStyle={{paddingHorizontal: 0, marginBottom: 8, ...style}}
              {...restProps}
            />
            <HelperText type="error">{restProps.error?.message}</HelperText>
          </>
        );
      }}
    />
  );
};

export default FormSelect;
