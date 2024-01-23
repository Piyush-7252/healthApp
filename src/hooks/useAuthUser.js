import useCRUD from './useCRUD';
import {USER_DETAILS} from '../store/types';
import {clearLocalStorage} from '../lib/asyncStorage';
const {API_URL, REQUEST_METHOD} = require('src/api/constants');
const {useCallback, useEffect} = require('react');

const useAuthUser = () => {
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
    // shouldClearError:false,
  });

  useEffect(() => {
    callUserDataAPI();
  }, []);

  useEffect(() => {
    if (userDataError) {
      clearUserData(true);
      clearLocalStorage();
    }
  }, [userDataError]);

  const refetchUser = useCallback((params = {}) => {
    callUserDataAPI(params);
  }, []);

  return [userData, userDataError, userDataLoading, refetchUser, clearUserData];
};
export default useAuthUser;
