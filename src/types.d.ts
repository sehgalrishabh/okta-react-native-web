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
  renderUnauthenticatedView: ReactNode | undefined;
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

declare type OktaProviderProps = {
  children: ReactNode;
  config: OktaAuth;
  redirectUri?: string;
  authRedirect?: () => void;
  useLinking?: boolean;
  renderUnauthenticatedView?: ReactNode;
};

declare type PayloadAction = {
  type: string;
  isAuthenticated: boolean;
  accessToken: AccessToken | undefined;
  idToken: IDToken | undefined;
  refreshToken: RefreshToken | undefined;
  user: UserClaims | undefined;
};
