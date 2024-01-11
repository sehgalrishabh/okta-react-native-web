import { type Dispatch } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaLogout, UpdateUser } from '../reducer/OktaAction';
import type { AuthProps } from '../types';

export const login = async (
  dispatch: Dispatch<any>,
  state: AuthProps,
  oktaClient: OktaAuth,
  redirect: () => void
) => {
  const sessionExists = await oktaClient.session.exists();
  const isAuthenticated = await oktaClient.isAuthenticated();

  if (!sessionExists) {
    if (oktaClient.isLoginRedirect()) {
      try {
        await oktaClient.handleRedirect();
      } catch (error) {
        console.log(error);
      }
    } else if (!isAuthenticated) {
      //start oidc flow, parse tokens from redirect callback url
      redirect();
    } else {
      //user if authenticated
      sessionExists
        ? state.user !== null &&
          state.user !== undefined &&
          UpdateUser(dispatch, oktaClient)
        : logout(dispatch, oktaClient);
    }
  } else if (!isAuthenticated && sessionExists) {
    oktaClient.token.getWithRedirect();
  }
};

export const logout = async (dispatch: Dispatch<any>, authClient: OktaAuth) => {
  await authClient.signOut();
  OktaLogout(dispatch);
};
