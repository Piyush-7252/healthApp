import React from 'react';
import CoursesStack from './CouresStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '../components/icon';
import SettingsStack from './SettingsStack';
import ProfileStack from './ProfileStack';
import BottomTabBar from './ButtomBar';
import GroupsStack from './GroupsStack';
import ChatStack from './ChatStack';

const Tab = createBottomTabNavigator();

const AuthenticatedNavigator = () => {
  // Define the tabBarIcon components for each screen
  const courseTabBarIcon = ({color, size}) => (
    <Icon name="book" color={color} size={size} />
  );

  const settingsTabBarIcon = ({color, size}) => (
    <Icon name="cog" color={color} size={size} />
  );
  const groupsTabBarIcon = ({color, size}) => (
    <Icon name="group" color={color} size={size} />
  );
  const chatsTabBarIcon = ({color, size}) => (
    <Icon name="comments" color={color} size={size} />
  );
  const profileTabBarIcon = ({color, size}) => (
    <Icon name="user" color={color} size={size} />
  );

  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={BottomTabBar}>
      <Tab.Screen
        name="Course"
        component={CoursesStack}
        options={{
          tabBarIcon: courseTabBarIcon,
          title: 'Course',
        }}
      />
      <Tab.Screen
        name="GroupsStack"
        component={GroupsStack}
        options={{
          tabBarIcon: groupsTabBarIcon,
          title: 'Groups',
        }}
      />
      <Tab.Screen
        name="ChatStack"
        component={ChatStack}
        options={{
          tabBarIcon: chatsTabBarIcon,
          title: 'Chat',
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarIcon: settingsTabBarIcon,
          title: 'Settings',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: profileTabBarIcon,
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthenticatedNavigator;
