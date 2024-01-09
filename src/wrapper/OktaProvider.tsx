import React, { useEffect, type Dispatch, useReducer } from 'react';
import { Linking } from 'react-native';
import { OktaAuth, type AuthState } from '@okta/okta-auth-js';
import { OktaLogin, OktaLogout, UpdateUser } from './OktaAction';
import OktaReducer, { OktaState } from './OktaReducer';
import type { AuthProps, OktaProviderProps, AuthStates } from '../types';
import { OktaContext } from './OktaContext';

const login = async (
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

const logout = async (dispatch: Dispatch<any>, authClient: OktaAuth) => {
  await authClient.signOut();
  OktaLogout(dispatch);
};

const OktaProvider = ({
  authRedirect,
  children,
  config,
  redirectUri,
  useLinking = false,
  renderUnauthenticatedView,
}: OktaProviderProps) => {
  if (!config) {
    throw Error('Okta config not provided or is invalid');
  }

  const [state, dispatch] = useReducer(OktaReducer, OktaState as AuthStates);

  const redirect = async () => {
    if (!authRedirect) {
      !redirectUri
        ? await config.signInWithRedirect()
        : !useLinking
        ? await config.signInWithRedirect({ authorizeUrl: redirectUri })
        : Linking.openURL(redirectUri);
    } else {
      authRedirect?.call;
    }
  };

  useEffect(() => {
    const setListeners = async () => {
      config.authStateManager.subscribe((authState: AuthState) => {
        // Logic based on authState is done here
        if (!authState.isAuthenticated) {
          // Render unauthenticated view
          return;
        }
        // Render authenticated view
        OktaLogin(dispatch, authState, config);
      });

      //Handle Callback
      if (config.token.isLoginRedirect()) {
        const { tokens } = await config.token.parseFromUrl(); // remember to "await" this async call
        config.tokenManager.setTokens(tokens);
      }

      if (!config.isLoginRedirect()) {
        // Trigger an initial authState change event when the app startup
        config.authStateManager.updateAuthState();
      }

      // normal app startup
      config.start(); // will update auth state and call event listeners
    };

    setListeners();
    return () => {
      config.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OktaContext.Provider
      value={{
        oktaClient: config,
        oktaLogin: () => login(dispatch, state, config, redirect),
        oktaLogout: () => logout(dispatch, config),
        renderUnauthenticatedView,
        ...state,
      }}
    >
      {children}
    </OktaContext.Provider>
  );
};

export default OktaProvider;
