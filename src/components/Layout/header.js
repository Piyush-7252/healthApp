import React from 'react';
import {View} from 'react-native';
import {IconButton} from '../icon';
import {useNavigation} from '@react-navigation/native';
import Typography from '../Typography';
import { verticalScale } from '../../lib/utils';

function Header(props) {
  const naivation = useNavigation();
  const {
    onBackPress,
    backIcon = true,
    title,
    containerStyle = {},
    titleStyle = {},
    backIconStyle = {},
    bigTitle,
  } = props || {};
  const handleBackPress = () => {
    if (naivation.canGoBack()) {
      naivation.goBack();
    }
  };
  return (
    <>
    <View
      style={{
        alignItems: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap:20,
        ...containerStyle,
      }}>
      {backIcon && (
        <IconButton
          style={{...backIconStyle}}
          onPress={onBackPress || handleBackPress}
        />
      )}
      {title && (
        <Typography variant="headlineSmall" style={{...titleStyle}}>
          {title}
        </Typography>
      )}
    </View>
      {bigTitle && (
        <View
          style={{
            marginTop: verticalScale(30),
            marginBottom: verticalScale(20),
          }}>
          <Typography variant="displaySmall">{bigTitle}</Typography>
        </View>
      )}
    </>
  );
}

export default Header;
