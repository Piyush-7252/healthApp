import React from 'react';
import {TouchableOpacity} from 'react-native';
import VectorIcon from 'react-native-vector-icons/FontAwesome';

const Icon = props => {
  return (
    <VectorIcon
      name="arrow-left"
      size={20}
      color={'rgb(74, 69, 78)'}
      {...props}
    />
  );
};

const IconButton = props => {
  const {style = {}, iconStlye = {}, ...restProps} = props || {};
  return (
    <TouchableOpacity
      style={{alignItems: 'flex-start', padding: 0, ...style}}
      {...restProps}>
      <VectorIcon
        name="arrow-left"
        size={20}
        color="rgb(74, 69, 78)"
        style={{...iconStlye}}
      />
    </TouchableOpacity>
  );
};
export {Icon, IconButton};
