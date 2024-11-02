import i18n from '../i18next/i18n';
import {APIErrorResType} from './types';
import axiosInstance from './axios';

/**
 * function taking error code and the cached error and return the mapped message
 * @param error
 * @param e
 * @returns {string|*}
 */
export const getErrorMessage = (error: APIErrorResType) => {
  try {
    const errorText = i18n.t(`errorCodes.${error.errorCode}`);

    const isMatch = errorText === `errorCodes.${error.errorCode}`;

    if (!isMatch) {
      return errorText;
    } else {
      console.error(error.statusText);
      if (error) {
        console.error(JSON.stringify(error));
      }
      console.error('Missing Error Code');
      return i18n.t('errorCodes.technicalError');
    }
  } catch (err) {
    return i18n.t('errorCodes.technicalError');
  }
};

/**
 * function taking access token and session id and add them to axios instance headers
 * @param accessToken string
 * @param sessionId string
 * @returns {AxiosRequest}
 */
export const addTokenToAxiosInstance = (
  accessToken: string,
  sessionId: string,
) => {
  axiosInstance.defaults.headers.common['X-Security-Token'] = accessToken;
  // axiosInstance.defaults.headers.common['X-Session-Id'] = sessionId;
};

export const removeTokenFromAxiosInstance = () => {
  delete axiosInstance.defaults.headers.common['X-Security-Token'];
};

export const addLanguageToAxiosInstance = (language: string) => {
  axiosInstance.defaults.headers.common['X-Session-Language'] =
    language.toUpperCase();
};

export const logout = async () => {
  try {
    // RootReducer.dispatch(ClearReducer());
  } catch (e) {
    console.log(e);
  }
};
