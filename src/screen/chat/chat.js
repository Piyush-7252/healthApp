/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Typography from '../../components/Typography';
import ChatHeader from './chatHeader';
import {View} from 'react-native';
import palette from '../../theme/palette';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import ChatBody from './chatBody';

const Chat = () => {
  return (
    <View
      style={{
        backgroundColor: palette.background.default,
        flex: 1,
        ...layoutPadding,
      }}>
      <ChatHeader />
      <ChatBody />
    </View>
  );
};

export default Chat;
