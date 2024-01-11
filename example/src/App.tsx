import * as React from 'react';
import { OktaProvider } from 'okta-react-native-web';
import OktaAuth from '@okta/okta-auth-js';
import Home from './Home';

const authClient = new OktaAuth({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: 'YOUR_CLIENT_ID_GOES_HERE',
  redirectUri: 'YOUR_REDIRECT_URI_GOES_HERE',
});

const App = () => {
  return (
    <OktaProvider config={authClient}>
      <Home />
    </OktaProvider>
  );
};

export default App;
