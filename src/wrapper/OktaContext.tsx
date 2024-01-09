import { createContext } from 'react';
import type { ContextProps } from '../types';

export const OktaContext = createContext<ContextProps>({
  oktaClient: undefined,
  isAuthenticated: false,
  accessToken: undefined,
  oktaLogin: () => {},
  oktaLogout: () => {},
  idToken: undefined,
  user: undefined,
  renderUnauthenticatedView: undefined,
});
