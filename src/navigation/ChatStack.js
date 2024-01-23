import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {UI_ROUTES} from '../lib/routeConstants';
import ChatTab from '../screen/chat/chatTab';
import Chat from '../screen/chat/chat';

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={UI_ROUTES.chatList}
        component={ChatTab}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Stack.Screen
        name={UI_ROUTES.chatScreen}
        component={Chat}
        options={({route}) => ({
          tabBarVisible:false,
        })}
      />
      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

function getTabBarVisibility(route) {
  if (route.name === UI_ROUTES.chatScreen) {
    return false;
  }

  return true;
}

export default ChatStack;
