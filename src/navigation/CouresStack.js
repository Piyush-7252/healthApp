import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CourseList from '../screen/course/courseList';
import courseDetails from '../screen/course/courseDetails';
import {UI_ROUTES} from '../lib/routeConstants';
import CategoryWiseCourses from '../screen/categoryWiseCourses';
import FilterListingCourse from '../screen/filterListingCourse';

const Stack = createStackNavigator();

const CoursesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CourseList" component={CourseList} />
      <Stack.Screen name="CourseDetail" component={courseDetails} />
      <Stack.Screen
        name={UI_ROUTES.categoryWiseCourses}
        component={CategoryWiseCourses}
      />
            <Stack.Screen
        name={UI_ROUTES.filterWiseCourses}
        component={FilterListingCourse}
      />

      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default CoursesStack;
