import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppNavigator from '../navigation/AppNavigator';
import useCRUD from '../hooks/useCRUD';
import {USER_DETAILS, USER_LOGIN} from '../store/types';
import {API_URL, REQUEST_METHOD} from '../api/constants';
import {clearLocalStorage, getLocalStorage} from '../lib/asyncStorage';
import useAuthUser from '../hooks/useAuthUser';
import {clearReadData, setReadData} from '../store/actions/crud';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

const AppAuthenticator = ({isAuthenticated, updateAuthentication}) => {
  const [
    userData,
    userDataError,
    userDataLoading,
    callUserDataAPI,
    clearUserData,
  ] = useAuthUser();

  const handleLogout = () => {
    updateAuthentication(false);
  };

  useEffect(() => {
    if (!userDataLoading && (userData || userDataError)) {
      setTimeout(() => {
        LottieSplashScreen.hide();
      }, 0);
    }
    if (userData) {
      updateAuthentication(true);
    } else if (!userData && !userDataLoading) {
      handleLogout();
    }
  }, [userData, userDataLoading]);

  useEffect(() => {
    if (userDataError) {
      handleLogout();
      setTimeout(() => {
        LottieSplashScreen.hide();
      }, 0);
    }
  }, [userDataError]);

  return (
    <AppNavigator
      isAuthenticated={isAuthenticated}
      updateAuthentication={updateAuthentication}
    />
  );
};

export default AppAuthenticator;
