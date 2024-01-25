![NPM Version](https://img.shields.io/npm/v/okta-react-native-web) ![NPM Type Definitions](https://img.shields.io/npm/types/okta-react-native-web)

# okta-react-native-web

Okta wrapper for react native web based on okta-auth-js sdk.

## Installation

```sh
npm install okta-react-native-web
```

## Usage

```js
import { OktaProvider } from 'okta-react-native-web';

// ...

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
```

In your protected routes use HOC to connect to OktaProvider

```js
import { withOkta } from 'okta-react-native-web';

// ...

const Home = () => {
  //...
};

export default withOkta(Home);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
