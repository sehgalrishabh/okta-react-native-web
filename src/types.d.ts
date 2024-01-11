// types.d.ts
import type {
  AccessToken,
  AuthState,
  IDToken,
  OktaAuth,
  RefreshToken,
  UserClaims,
} from '@okta/okta-auth-js';
import type { ReactNode } from 'react';

declare type ContextProps = {
  accessToken: AccessToken | undefined;
  oktaClient: OktaAuth | undefined;
  oktaLogin: () => void;
  oktaLogout: () => void;
  idToken: IDToken | undefined;
  isAuthenticated: boolean;
  renderUnauthenticatedView: JSX.Element | undefined;
  user: UserClaims | undefined;
};

declare type AuthProps = {
  accessToken?: AccessToken | undefined;
  authState?: AuthState;
  idToken?: IDToken | undefined;
  isAuthenticated?: boolean;
  refreshToken?: RefreshToken | undefined;
  user?: UserClaims | undefined;
};

declare type AuthStates = {
  isAuthenticated: boolean;
  accessToken: AccessToken | undefined;
  idToken: IDToken | undefined;
  refreshToken: RefreshToken | undefined;
  user: UserClaims | undefined;
};

/**
 * Okta wrapper for react-native-web.
 * @public
 */
declare type OktaProviderProps = {
  children: ReactNode;
  /**
   * Pass OktaAuth client here
   */
  config: OktaAuth;
  /**
   * Add custom redirect uri here
   */
  redirectUri?: string;
  /**
   * Add your custom redirect logic here
   */
  authRedirect?: () => void;
  /**
   * Use React Native's linking api instead of the default signInWithRedirect implementation
   */
  useLinking?: boolean;
  /**
   * Render custom view for unaunthenticated users. By default it shows an ActivityIndicator
   */
  renderUnauthenticatedView?: JSX.Element;
};

declare type PayloadAction = {
  type: string;
  isAuthenticated: boolean;
  accessToken: AccessToken | undefined;
  idToken: IDToken | undefined;
  refreshToken: RefreshToken | undefined;
  user: UserClaims | undefined;
};
