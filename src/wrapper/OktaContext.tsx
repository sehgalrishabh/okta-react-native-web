import { createContext } from 'react';
import type { ContextProps } from '../types';
/**
 * Context for the OktaProvider
 *
 * @returns
 *
 * oktaClient - Instance of OktaClient
 *
 * isAuthenticated - Authentication state of the user
 *
 * accessToken - AccessToken of the user, returns undefined in case accessToken is not generated
 *
 * idToken -  This void function can be used to start the login flow
 *
 * oktaLogin - This void function can be used to start the login flow
 *
 * oktaLogout - This void function can be used to start the logout flow
 */
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
