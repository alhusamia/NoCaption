export type APIMethodType = 'post' | 'put' | 'get' | 'delete' | 'patch';

export type APIHeadersReqType = {
  'Content-Type'?: string;
  'X-Client-Id'?: string;
  'X-Principle-Type'?: 'MERCHANT';
  'X-Request-Id'?: string;
  'X-Session-Id'?: string | any;
  'X-Session-Language'?: 'EN' | 'AR';
  'X-Device-Id'?: string;
  'X-Device-Name'?: string;
  'X-Device-Platform'?: 'Android' | 'IOS';
  'X-Security-Token'?: string;
  'X-Token-Capcha'?: string;
  'X-Encryption-Key'?: string;
  'X-App-Version'?: string;
  'Cache-Control'?: string;
};

export type APIHeadersResType = {
  sessionId?: string;
  securityToken?: string;
  refreshSecurityToken?: string;
  deviceToken?: string;
  refreshDeviceToken?: string;
  forceUpdate?: boolean;
  otpToken?: string;
  principleId?: string;
  principleType?: string;
  xPrivilegeToken?: string;
  x_merchant_id?: string;
};

export type APIParamsType = {
  offset?: number;
  limit?: number;
};

export type APIErrorResType = {
  errorCode: number;
  status: number;
  statusText: string;
};
export type APISuccessResType = {
  status: string;
  message: string;
};
