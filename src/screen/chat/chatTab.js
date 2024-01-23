/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, Image, View, useWindowDimensions} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import chatPerson from '../../assets/images/chatPersonNew.jpg';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import Typography from '../../components/Typography';
import {verticalScale} from '../../lib/utils';
import palette from '../../theme/palette';
import {useNavigation} from '@react-navigation/native';
import {UI_ROUTES} from '../../lib/routeConstants';
const ChatMessage = ({name, message, time}) => {
  const navigation = useNavigation();
  const handleChatItemClick = () => {
    navigation.navigate(UI_ROUTES.chatScreen, {});
  };
  return (
    <TouchableRipple onPress={() => handleChatItemClick()}>
      <View
        style={{flexDirection: 'row', paddingVertical: 10, ...layoutPadding}}>
        <Image
          source={chatPerson}
          style={{
            width: verticalScale(60),
            height: verticalScale(60),
            borderRadius: 50,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={{marginLeft: 10}}>
            <Typography variant="labelLarge">{name}</Typography>
            <Typography variant="bodyMedium">{message}</Typography>
          </View>
          <View>
            <Typography variant="bodyMedium">{time}</Typography>
            <View style={{alignItems: 'flex-end', flex: 1}}>
              <View
                style={{
                  height: verticalScale(25),
                  width: verticalScale(25),
                  borderRadius: 50,
                  backgroundColor: palette.background.main,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Typography
                  variant="bodySmall"
                  style={{color: palette.text.paper}}>
                  {5}
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

const FirstRoute = () => {
  const messages = [
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    {
      name: 'Dr. Suzie Doe',
      message: "It's a beautiful day :)",
      time: '12:00 pm',
    },
    // Add more messages here...
  ];

  return (
    <FlatList
      data={messages}
      renderItem={({item}) => <ChatMessage {...item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const SecondRoute = () => <View />; // Replace with your second screen

const renderScene = SceneMap({
  indivituals: FirstRoute,
  groups: SecondRoute,
});

const ChatTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'indivituals', title: 'Indivituals'},
    {key: 'groups', title: 'Groups'},
  ]);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({focused, route}) => {
          return (
            <Typography
              variant="labelLarge"
              style={{...(focused ? {color: palette.text.main} : {})}}>
              {route.title}
            </Typography>
          );
        }}
        indicatorStyle={{backgroundColor: palette.background.main, height: 3}}
        style={{backgroundColor: palette.background.default, elevation: 4}}
        android_ripple={{color: palette.background.main}}
      />
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: palette.background.default}}>
      <View style={{marginBottom: 10, marginTop: 20, ...layoutPadding}}>
        <Typography variant="titleMedium">Chat</Typography>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};
export default ChatTab;
