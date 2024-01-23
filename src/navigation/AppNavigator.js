import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import LoginScreen from '../screen/login/loginScreen';
import {UI_ROUTES} from '../lib/routeConstants';
import SingupScreen from '../screen/signup/signupScreen';
import Step1 from '../screen/signup/getStarted/step1';
import Step2 from '../screen/signup/getStarted/step2';
import Step3 from '../screen/signup/getStarted/step3';
import Step4 from '../screen/signup/getStarted/step4';
import TrackersApp from '../screen/trackers';
import ScheduleMeeting from '../screen/meeting/scheduleMeeting';
import JoinMeeting from '../screen/meeting/addMeeting';
import ZoomMeetingScreen from '../screen/meeting/joinMeeting';
// import ZoomMeetingScreen from '../screen/meeting/joinMeeting1';
import TopicDetails from '../screen/topicDetails/topicDetails';
import QuizFile from '../screen/quiz/quizFile';
const Stack = createStackNavigator();

const AppNavigator = ({isAuthenticated = false, updateAuthentication}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthenticated ? (
        <Stack.Screen
          name={UI_ROUTES.authenticated}
          component={AuthenticatedNavigator}
        />
      ) : (
        <Stack.Screen
          name={UI_ROUTES.login}
          component={ZoomMeetingScreen}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
