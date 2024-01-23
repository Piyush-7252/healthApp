import React from 'react';
import LoadingButton from '../CustomButton/loadingButton';
import { View } from 'react-native';

const ModalFooter = (props) => {
  const { footer } = props || {};
  const { leftActions = [], rightActions = [] } = footer || {};

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <View style={{ display: 'flex', gap: 15 }}>
        {leftActions.map((item) => (
          <LoadingButton
            key={item.name}
            loading={item.loading}
            loadingPosition="start"
            variant={item.variant || 'contained'}
            onClick={item.action}
            disabled={item.disabled}
            style={item.style}
          >
            {item.name}
          </LoadingButton>
        ))}
      </View>
      <View>
        {rightActions.map((item) => (
          <LoadingButton
            key={item.name}
            loading={item.loading}
            variant={item.variant || 'contained'}
            onClick={item.action}
            disabled={item.disabled}
            style={item.style}
          >
            {item.name}
          </LoadingButton>
        ))}
      </View>
    </View>
  );
};

export default React.memo(ModalFooter);
