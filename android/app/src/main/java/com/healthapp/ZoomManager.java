package com.healthapp;

import android.util.Log;
import us.zoom.sdk.JoinMeetingOptions;
import us.zoom.sdk.MeetingService;
import us.zoom.sdk.ZoomSDK;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ZoomManager extends ReactContextBaseJavaModule {

    private static final String TAG = "ZoomManager";

    public ZoomManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ZoomManager";
    }

    @ReactMethod
    public void initializeZoom(String appKey, String appSecret) {
        ZoomSDK zoomSDK = ZoomSDK.getInstance();
        zoomSDK.initialize(this.getReactApplicationContext(), appKey, appSecret, ZoomSDK.SANDBOX);
    }

    @ReactMethod
    public void joinMeeting(String meetingNumber, String displayName) {
        MeetingService meetingService = ZoomSDK.getInstance().getMeetingService();
        if (meetingService == null) {
            Log.e(TAG, "Zoom SDK Meeting Service is not available");
            return;
        }

        JoinMeetingOptions options = new JoinMeetingOptions();
        int response = meetingService.joinMeeting(this.getCurrentActivity(), meetingNumber, displayName, options);
        Log.d(TAG, "Join meeting response: " + response);
    }
}
