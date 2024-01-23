import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ZoomVideoSdk, ZoomView } from '@zoom/react-native-videosdk';

const ZoomMeetingScreen = () => {
  useEffect(() => {
    ZoomVideoSdk.initialize({
      clientKey: 'YOUR_ZOOM_SDK_KEY',
      // clientKey:'2lIgZoLhRDGheANU7xh8tw',
      clientSecret: 'YOUR_ZOOM_SDK_SECRET',
      // clientSecret:'92rqCCJjevwQYnHFvKSmx4eM9LriAad6',
    });

    ZoomVideoSdk.joinMeeting({
      meetingNumber: '123456789',
      userName: 'John Doe',
      userId: 'USER_ID',
    });

    ZoomVideoSdk.addListener('onUserVideoStatusChanged', (payload) => {
      console.log('User video status changed:', payload);
    });

    return () => {
      ZoomVideoSdk.leaveMeeting();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ZoomView style={{ flex: 1 }} />
      <h1>vfjsd</h1>
    </View>
  );
};

export default ZoomMeetingScreen;
