import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { InputBase, useTheme } from '@mui/material';
import palette from 'src/theme/palette';
import { get, isFunction, debounce } from '../../lib/lodash';
import Icon from '../icon/icon';

import './searchInput.scss';

const SearchInput = (props) => {
  const {
    placeholder,
    onChange,
    defaultValue = '',
    reduxValue,
    maxLength = 60,
    height,
  } = props;
  const theme = useTheme();
  const tableHeaderColors = get(theme, 'palette.table.tableHeader', {});
  const [searchTerm, setSearchTerm] = useState(
    reduxValue === undefined ? defaultValue : reduxValue
  );

  const onSearch = useCallback(
    (searchValue) => {
      if (isFunction(onChange)) {
        onChange(searchValue);
      }
    },
    [onChange]
  );

  const debounceValidation = useMemo(
    () => debounce(onSearch, 1000),
    [onSearch]
  );

  const handleSearchChange = useCallback(
    (event) => {
      const value = get(event, 'target.value', '');
      setSearchTerm(value);
      debounceValidation(value);
    },
    [debounceValidation]
  );

  const handleOnClearSearch = useCallback(() => {
    setSearchTerm('');
    onChange(null);
  }, [onChange]);

  return (
    <InputBase
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleSearchChange}
      style={{ height: `${height}` }}
      className="searchInput"
      sx={{
        '& .MuiInputBase-input': {
          color: tableHeaderColors?.searchInputColor,
        },
        fontSize: '0.9rem',
        backgroundColor: palette.background.accentBlue,
      }}
      inputProps={{ maxLength }}
      data-testid="searchInput_test"
      endAdornment={
        <div
          style={{ color: tableHeaderColors?.searchIconColor }}
          className="right_container"
          data-testid="search-icon"
        >
          {searchTerm ? (
            <Icon
              icon="eva:close-outline"
              onClick={handleOnClearSearch}
              cursor="pointer"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
          ) : (
            <Icon
              icon="eva:search-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
          )}
        </div>
      }
    />
  );
};

SearchInput.defaultProps = {
  placeholder: '',
  searchQuery: '',
  handleOnSearch: () => { },
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  searchQuery: PropTypes.string,
  handleOnSearch: PropTypes.func,
};

export default React.memo(SearchInput);
