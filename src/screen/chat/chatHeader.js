/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Typography from '../../components/Typography';
import {Image, View} from 'react-native';
import {Icon} from '../../components/icon';
import chatPerson from '../../assets/images/chatPersonNew.jpg';
import {verticalScale} from '../../lib/utils';
import palette from '../../theme/palette';

const ChatHeader = () => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        paddingBottom: verticalScale(14),
        borderColor: palette.background.gray,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Icon name="arrow-left" />
        <View style={{flexDirection: 'row', gap: 10}}>
          <Image
            source={chatPerson}
            style={{
              width: verticalScale(50),
              height: verticalScale(50),
              borderRadius: 50,
            }}
          />
          <View style={{marginTop: 0}}>
            <Typography variant="labelLarge">Dr. Suzie Doe</Typography>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Typography variant="bodyMedium">15 Members</Typography>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 50,
                  backgroundColor: palette.text.secondary,
                }}
              />
              <Typography variant="bodyMedium">
                Created on 16 july 2022
              </Typography>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;
