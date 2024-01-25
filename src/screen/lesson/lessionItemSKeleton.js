import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const LessionItemSKeleton = ({style = {}} = {}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{width: '70%', height: 20, ...style}} />
    </SkeletonPlaceholder>
  );
};

export default LessionItemSKeleton;
