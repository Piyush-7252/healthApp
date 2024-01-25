import React, { useCallback, useEffect, useMemo } from 'react';

import { REQUEST_METHOD } from 'src/api/constants';
import Select from 'src/components/Select';
import useAuthUser from 'src/hooks/useAuthUser';
import useCRUD from '../../hooks/useCRUD';

const WiredSelect = ({
  getValues,
  defaultValue,
  name,
  index,
  labelAccessor = 'name',
  valueAccessor = 'code',
  url,
  params,
  onChange = () => {},
  cache = true,
  reduxValue,
  code,
  extraId,
  isAllOptionNeeded = false,
  allOptionLabel,
  crudId,
  applyPractice,
  defaultOptions,
  responseModifier,
  ...restProps
}) => {
  const [data, , loading, getData] = useCRUD({
    id:
      crudId ||
      `wired-select-${name}${code ? `-${code}` : ''}${
        extraId ? `-${extraId}` : ''
      }`,
    url,
    type: REQUEST_METHOD.get,
    responseModifier,
  });
  const [userData] = useAuthUser();
  if (applyPractice && userData?.practice?.id) {
    Object.assign(params, { practice: userData.practice.id });
  }

  useEffect(() => {
    if (defaultOptions?.length || url === null) {
      return;
    }
    if (!cache) {
      getData(params);
    } else if (!data) {
      getData(params);
    }
  }, [cache]);

  const handleOnChange = useCallback(
    (e) => {
      onChange(e?.target?.value, e);
    },
    [onChange]
  );

  const options = useMemo(() => {
    const parsedOptions = [...(data?.results || data || defaultOptions || [])];
    const dummyOption = {};
    if (isAllOptionNeeded && parsedOptions?.length > 0) {
      if (Array.isArray(labelAccessor)) {
        labelAccessor.forEach((item, itr) => {
          if (itr === 0) {
            dummyOption[item] = 'All';
          } else {
            dummyOption[item] = '';
          }
        });
        dummyOption[valueAccessor] = 'ALL';
        dummyOption[labelAccessor[0]] = allOptionLabel || 'All';
      } else {
        dummyOption[labelAccessor] = allOptionLabel || 'All';
        dummyOption[valueAccessor] = 'ALL';
      }
      parsedOptions.unshift(dummyOption);
    }
    return parsedOptions;
  }, [
    allOptionLabel,
    data,
    defaultOptions,
    isAllOptionNeeded,
    labelAccessor,
    valueAccessor,
  ]);

  const parsedDefaultValue = useMemo(() => {
    if (reduxValue) {
      const value = options.find(
        (item) => item[valueAccessor] === reduxValue
      )?.[valueAccessor];
      return value;
    }
    return null;
  }, [options, reduxValue, valueAccessor]);

  const getOptionLabel = useCallback(
    (option) => {
      if (Array.isArray(labelAccessor)) {
        return labelAccessor
          .reduce((acc, key) => `${acc} ${option[key] || ''} `, '')
          .trim();
      }
      return option[labelAccessor] || option;
    },
    [labelAccessor]
  );

  return (
    <Select
      getOptionLabel={getOptionLabel}
      data={options}
      defaultValue={parsedDefaultValue || defaultValue}
      loading={loading}
      onChange={handleOnChange}
      labelAccessor={labelAccessor}
      valueAccessor={valueAccessor}
      {...restProps}
    />
  );
};

export default WiredSelect;
