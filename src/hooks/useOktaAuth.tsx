import { useContext } from 'react';
import { OktaContext } from '../wrapper/OktaContext';

const useOktaAuth = () => {
  const { accessToken, isAuthenticated, oktaClient, oktaLogin, oktaLogout } =
    useContext(OktaContext);

  return { accessToken, isAuthenticated, oktaClient, oktaLogin, oktaLogout };
};

export default useOktaAuth;
