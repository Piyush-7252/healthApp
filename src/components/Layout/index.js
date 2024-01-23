import React from 'react';
import {View} from 'react-native';
import {scale} from '../../lib/utils';
import Header from './header';
import {Surface} from 'react-native-paper';
import {layoutStyle} from './layoutStyle';
function Layout({children, ...restProps}) {
  const {showHeader = true, header: CustomeHeader} = restProps || {};

  return (
    <View style={{...layoutStyle}}>
      {CustomeHeader && <CustomeHeader />}
      {showHeader && <Header {...restProps} />}
      {children}
    </View>
  );
}

export default Layout;
