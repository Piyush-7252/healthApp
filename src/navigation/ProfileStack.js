import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CourseList from '../screen/course/courseList';
import courseDetails from '../screen/course/courseDetails';
import {UI_ROUTES} from '../lib/routeConstants';
import CategoryWiseCourses from '../screen/categoryWiseCourses';
import EditProfile from '../screen/profile/editProfile';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={UI_ROUTES.profileDetail} component={EditProfile} />

      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
