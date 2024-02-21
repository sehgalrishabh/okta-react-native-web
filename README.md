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

Don't want to use protected routes ? Got your back, now you can use `useOktaAuth` hook to get access to required props.

```js
import { useOktaAuth } from 'okta-react-native-web';

// ...

const Home = () => {
  const { accessToken, isAuthenticated, oktaClient, oktaLogin, oktaLogout } =
    useOktaAuth();
  //...
};

export default Home;
```

## Supported props for `OktaProvider`

| Props                     | Description                                                                                 | Type                                                                              | Required |
| ------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------- |
| children                  | Pass your react elements here. You can put your navigation here to enable protected routes  | [ReactNode](https://reactnative.dev/docs/react-node)                              | yes      |
| config                    | Pass `OktaAuth` client here                                                                 | [OktaAuth](https://github.com/okta/okta-auth-js?tab=readme-ov-file#configuration) | yes      |
| redirectUri               | Add custom redirect uri here                                                                | string                                                                            |          |
| authRedirect              | Add your custom redirect logic here                                                         | void                                                                              |          |
| useLinking                | Use React Native's linking api instead of the default `signInWithRedirect` implementation   | boolean                                                                           |          |
| renderUnauthenticatedView | Render custom view for unaunthenticated users. By default it renders an `ActivityIndicator` | JSX.Element                                                                       |          |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

```

```
