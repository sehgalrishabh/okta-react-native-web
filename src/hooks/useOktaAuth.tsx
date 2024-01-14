import { useContext } from 'react';
import { OktaContext } from '../wrapper/OktaContext';

const useOktaAuth = () => {
  const { accessToken, isAuthenticated, oktaLogin, oktaLogout } =
    useContext(OktaContext);

  return { accessToken, isAuthenticated, oktaLogin, oktaLogout };
};

export default useOktaAuth;
