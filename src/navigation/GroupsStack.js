import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { UI_ROUTES } from '../lib/routeConstants';
import Settings from '../screen/setting';
import GroupsTab from '../screen/groups';
import GroupDetail from '../screen/groups/groupDetail';

const Stack = createStackNavigator();

const GroupsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={UI_ROUTES.groupsListing} component={GroupsTab} />
      <Stack.Screen name={UI_ROUTES.groupDetail} component={GroupDetail} />


      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default GroupsStack;
