import React, { useEffect, useReducer } from 'react';
import { Linking } from 'react-native';
import { type AuthState } from '@okta/okta-auth-js';
import { OktaLogin } from '../reducer/OktaAction';
import OktaReducer, { OktaState } from '../reducer/OktaReducer';
import type { OktaProviderProps, AuthStates } from '../types';
import { OktaContext } from './OktaContext';
import { login, logout } from '../utils/helpers';

/**
 * Okta wrapper for react-native-web.
 *
 * @remarks
 * This provider can be used to wrap the components. This will help to make routes or components protected and will provide necessary props.
 *
 * @example
 * ```tsx
 * import { OktaProvider } from 'okta-react-native-web';
 *
 * const App = () => (
 *   <OktaProvider config={authClient}>
 *   </OktaProvider>
 * );
 * ```
 */
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
