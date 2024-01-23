/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Typography from 'src/components/Typography';
import CustomForm from 'src/components/form';
import useCRUD from '../../hooks/useCRUD';
import {Divider, Surface} from 'react-native-paper';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import {USER_DETAILS, USER_LOGIN} from '../../store/types';
import {UI_ROUTES} from '../../lib/routeConstants';
import {requiredField} from '../../lib/constants';
import LoadingButton from '../../components/CustomButton/loadingButton';
import {ScrollView, View} from 'react-native';
import {scale, verticalScale} from '../../lib/utils';
import Layout from '../../components/Layout';
import {setLocalStorage} from '../../lib/asyncStorage';
import palette from '../../theme/palette';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import {Icon} from '../../components/icon';
import {useDispatch} from 'react-redux';
import {setReadData} from '../../store/actions/crud';

export const loginFormGroups = [
  {
    inputType: 'text',
    type: 'text',
    name: 'username',
    textLabel: 'Username',
    required: requiredField,
    containerStyle: {marginBottom: '1.875rem'},
  },
  {
    inputType: 'text',
    type: 'password',
    name: 'password',
    textLabel: 'Password',
    required: requiredField,
    pattern: {
      value: '',
      message: '',
    },
    containerStyle: {marginBottom: '1.875rem'},
  },
];

let selectedRole;
const LoginScreen = ({updateAuthentication} = {}) => {
  console.log('Rendering LoginScreen');
  const [loginError, setLoginError] = useState(null);
  const dispatch = useDispatch();

  const [
    userLoginResponse,
    userLoginResponseError,
    loading,
    callUserLoginAPI,
    clearUserLoginResponse,
  ] = useCRUD({
    id: USER_LOGIN,
    url: API_URL.login,
  });
console.log(">>>>>>>>>>>",userLoginResponse)
  const [
    userData,
    userDataError,
    userDataLoading,
    callUserDataAPI,
    clearUserData,
  ] = useCRUD({
    id: USER_DETAILS,
    url: API_URL.userDetail,
    type: REQUEST_METHOD.get,
  });

  const form = useForm({mode: 'onChange'});

  useEffect(() => {
    if (userLoginResponse) {
      callUserDataAPI();
      setLocalStorage({key: 'isAuthenticated', value: 'true'});
      setLocalStorage({
        key: 'userLogin',
        value: JSON.stringify(userLoginResponse),
      });

      updateAuthentication(true);
      setLoginError(null);
    }
  }, [userLoginResponse]);
  useEffect(() => {
    return () => clearUserLoginResponse(true);
  }, []);
  useEffect(() => {
    if (userLoginResponseError) {
      setLoginError(userLoginResponseError);
    }
  }, [userLoginResponseError]);

  const {handleSubmit} = form;

  const handleLogin = useCallback(
    data => {
      const userCred = {
        username: 'brijeshp' || data.email,
        password: 'Cv)0jH20b2r$WrQN%2C6^osK' || data.password,
      };
      const {username, password} = userCred;

      if (username && password) {
        callUserLoginAPI({
          data: userCred,
        });
      }
    },
    [callUserLoginAPI],
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
        ...layoutPadding,
      }}>
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: verticalScale(70),
          }}>
          <Typography variant="displaySmall">Log in</Typography>
        </View>
        <View style={{alignItems: 'center', marginTop: verticalScale(10)}}>
          <Typography variant="titleSmall" style={{color: palette.error.main}}>
            {loginError}
          </Typography>
        </View>
        <View style={{marginTop: verticalScale(30)}}>
          <CustomForm
            formGroups={loginFormGroups}
            columnsPerRow={1}
            form={form}
          />

          <Typography
            style={{textAlign: 'right', marginTop: verticalScale(15)}}>
            Forgot password?
          </Typography>
          <LoadingButton
            id="submit-button"
            size="medium"
            type="submit"
            loading={loading}
            onPress={handleSubmit(handleLogin)}
            label="Sign in"
            style={{marginTop: verticalScale(40)}}
            disabled={loading}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 30,
            }}>
            <Divider style={{flex: 1, height: 1, marginRight: 10}} />
            <Typography>Or</Typography>
            <Divider style={{flex: 1, height: 1, marginLeft: 10}} />
          </View>
        </View>
        <View style={{paddingBottom: verticalScale(50)}}>
          <LoadingButton
            id="submit-button"
            size="medium"
            type="submit"
            onPress={() => {}}
            label="Connect with Apple"
            style={{backgroundColor: '#252428'}}
            icon={() => {
              return <Icon name="apple" color="white" />;
            }}
          />

          <LoadingButton
            id="submit-button"
            size="medium"
            type="submit"
            onPress={() => {}}
            label="Connect with Facebook"
            style={{marginTop: verticalScale(20), backgroundColor: '#2e6ed7'}}
            icon={() => {
              return <Icon name="facebook" color="white" />;
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
