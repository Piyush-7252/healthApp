import React from 'react';
import Typography from '../../components/Typography';
import {FlatList, View} from 'react-native';
import palette from '../../theme/palette';
import {verticalScale} from '../../lib/utils';
const tempData = [
  {
    message: 'How are you ?',
    time: '12:30 am',
    sender: 1,
  },
  {
    message: 'I am fine and you ?',
    time: '12:30 am',
    sender: 2,
  },
  {
    message: 'Do you know GPT',
    time: '12:30 am',
    sender: 1,
  },
  {
    message: "Yes it's a text processing model",
    time: '12:30 am',
    sender: 2,
  },
  {
    message: 'How are you ?',
    time: '12:30 am',
    sender: 1,
  },
  {
    message: 'How are you ?',
    time: '12:30 am',
    sender: 1,
  },
  {
    message: 'How are you ?',
    time: '12:30 am',
    sender: 1,
  },
  {
    message: 'How are you ?',
    time: '12:30 am',
    sender: 1,
  },

  {
    message: 'I am fine and you ?',
    time: '12:30 am',
    sender: 2,
  },
  {
    message: 'I am fine and you ?',
    time: '12:30 am',
    sender: 2,
  },
  {
    message: 'I am fine and you ?',
    time: '12:30 am',
    sender: 2,
  },
  {
    message: 'I am fine and you ?',
    time: '12:30 am',
    sender: 2,
  },
  {
    message: 'How are you ?',
    time: '12:30 am',
    sender: 1,
  },
  {
    message: 'How are you ?',
    time: '12:30 am',
    sender: 1,
  },
  {
    message: 'How are you ?',
    time: '12:30 am',
    sender: 1,
  },
  {
    message: 'How are you ?',
    time: '12:30 am',
    sender: 1,
  },
];
const ChatBody = () => {
  const renderItem = ({item, index}) => {
    const {sender} = item;
    const isSender1 = sender === 1;

    return (
      <View
        style={{
          marginBottom: 10,
          justifyContent: isSender1 ? 'flex-end' : 'flex-start',
          alignItems: isSender1 ? 'flex-end' : 'flex-start',
          ...(index === 0 ? {marginTop: verticalScale(26)} : {}),
        }}>
        <View
          style={{
            backgroundColor: isSender1
              ? palette.background.main
              : palette.background.gray,
            padding: 14,
            borderRadius: 18,

            ...(isSender1
              ? {borderTopRightRadius: 0}
              : {borderTopLeftRadius: 0}),
          }}>
          <Typography style={{color: isSender1 ? 'white' : 'black'}}>
            {item.message}
          </Typography>
        </View>
      </View>
    );
  };

  return (
    <View
    //  style={{marginTop: verticalScale(30)}}
    >
      <FlatList
        data={tempData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom:20}}
      />
    </View>
  );
};

export default ChatBody;
