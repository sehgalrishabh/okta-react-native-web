import { type Dispatch } from 'react';
import { type AccessToken, type IDToken, OktaAuth } from '@okta/okta-auth-js';
import { ActionTypes } from './OktaReducer';

const tokenManager = async (authClient: OktaAuth) => authClient.tokenManager;

const accessToken = async (authClient: OktaAuth) =>
  (await (await tokenManager(authClient)).get('accessToken')) as AccessToken;

const idToken = async (authClient: OktaAuth) =>
  (await (await tokenManager(authClient)).get('idToken')) as IDToken;

const userInfo = async (authClient: OktaAuth) => {
  try {
    const at = await accessToken(authClient);
    const token = await idToken(authClient);
    if (at && token) {
      return await authClient.token.getUserInfo(at, token);
    } else {
      return undefined;
    }
  } catch (error) {
    console.warn(error);
    return undefined;
  }
};

const OktaLogin = async (
  dispatch: Dispatch<any>,
  state: any,
  authClient: OktaAuth
) => {
  const user = await userInfo(authClient);
  dispatch({ type: ActionTypes.AUTH_SUCCESS, ...state, user });
};

const OktaLogout = async (dispatch: Dispatch<any>) => {
  dispatch({ type: ActionTypes.AUTH_LOGOUT });
};

const UpdateUser = async (dispatch: Dispatch<any>, authClient: OktaAuth) => {
  try {
    const user = await userInfo(authClient);
    dispatch({ type: ActionTypes.UPDATE_USER, user });
  } catch (error) {
    console.warn(error);
    dispatch({ type: ActionTypes.UPDATE_USER, user: undefined });
  }
};

export { OktaLogin, OktaLogout, UpdateUser };
