import axios from 'axios';
import {Platform} from 'react-native';
import uuid from 'react-native-uuid';
import DeviceInfo from 'react-native-device-info';

import Env from '../../env';
import {navigate} from '../navigation';
import {ASYNC_STORAGE_KEYS} from '../constants';
import {removeTokenFromAxiosInstance} from './utils';
import {storeData} from '../../MMKV';

const instance = axios.create({
  baseURL: Env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Id': Env.X_CLIENT_ID,
    'X-Principle-Type': 'MERCHANT',
    'X-Session-Id': uuid.v4(),
    'X-Device-Id': DeviceInfo.getUniqueIdSync() || 'Device Id',
    'X-Device-Name': DeviceInfo.getDeviceNameSync() || 'Device Name',
    'X-Device-Platform': Platform.OS === 'ios' ? 'IOS' : 'Android',
    'X-App-Version': DeviceInfo.getVersion(),
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
});

instance.interceptors.request.use(async function (request) {
  request.headers['X-Request-Id'] = uuid.v4();
  // request.cancelToken = cancelTokenSource.token;
  // console.log('========= REQUEST HEADERS =========', request.headers);
  // console.log('========= REQUEST DATA =========', request.data);
  return request;
});

instance.interceptors.response.use(
  function (response) {
    // console.log('========= RESPONSE HEADERS =========', response?.headers);
    // console.log('========= RESPONSE DATA =========', response.data);
    return response;
  },
  function (error) {
    const code =
      error.response?.data?.header?.status.code ||
      error?.response?.headers['status.code'];

    console.log('========= ERR RESPONSE URL', error.response.config.url);
    console.log(
      '========= ERR RESPONSE HEADERS =========',
      error.response?.headers,
    );
    console.log('========= ERR RESPONSE DATA =========', error.response.data);
    if (error.response) {
      if (['E200986'].includes(code)) {
        storeData(ASYNC_STORAGE_KEYS.IS_LOGGED_IN, 'false');

        removeTokenFromAxiosInstance();
        navigate('Login'); // return to login
      }
      error.response.data = {
        ...error.response.data,
        status: error.response.data.status,
        statusText: error.response.data.statusText,
        errorCode: code,
      };
    }
    return error.response;
  },
);

export default instance;
