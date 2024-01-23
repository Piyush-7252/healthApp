/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Avatar from '../../../components/Avatar';
import Typography from '../../../components/Typography';
import palette from '../../../theme/palette';
import {TouchableRipple} from 'react-native-paper';
import {layoutPadding} from '../../../components/Layout/layoutStyle';

function MembersItem({item, index}) {
  console.log('🚀 ~ file: membersItem.js:10 ~ MembersItem ~ item:', item);
  return (
    <TouchableRipple onPress={() => {}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...layoutPadding,

        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Avatar
            source={{
              uri: item?.avatar_urls?.full,
            }}
            size={70}
          />
          <View>
            <Typography>{item?.name}</Typography>
            <Typography>Software Eng.</Typography>
          </View>
        </View>
        <View>
          {/* <View
            style={{
              borderRadius: 50,
              height: 30,
              width: 30,
              backgroundColor: palette.background.main,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography style={{color: palette.text.paper}}>{index}</Typography>
          </View> */}
        </View>
      </View>
    </TouchableRipple>
  );
}

export default MembersItem;
