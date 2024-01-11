import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { OktaContext } from './OktaContext';
/**
 * Okta wrapper for react-native-web.
 *
 * @remarks
 * HOC to connect component with OktaProvider and provide the neccessary props.
 *
 * @example
 * ```tsx
 * ...
 * import { withOkta } from 'okta-react-native-web';
 * ...
 * const Home = (props) => {
 * const {isAuthenticated,oktaClient,accessToken,oktaLogin,oktaLogout,idToken,user} = props;
 *   return (
 *    <View>
 *       <Text>Home</Text>
 *    </View>
 *   );
 * export default withOkta(Home);
 * ```
 */
export default (Component: React.FunctionComponent) => {
  const WithOkta = (props: any): JSX.Element => {
    const {
      isAuthenticated,
      accessToken,
      oktaClient,
      oktaLogin,
      oktaLogout,
      idToken,
      user,
      renderUnauthenticatedView,
    } = useContext(OktaContext);

    if (!isAuthenticated) {
      !oktaClient?.isLoginRedirect() && oktaLogin();
      // return view for unauthenticated user
      return renderUnauthenticatedView ? (
        renderUnauthenticatedView
      ) : (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Component
        {...props}
        isAuthenticated={isAuthenticated}
        oktaClient={oktaClient}
        accessToken={accessToken}
        oktaLogin={oktaLogin}
        oktaLogout={oktaLogout}
        idToken={idToken}
        user={user}
      />
    );
  };
  return WithOkta;
};

const styles = StyleSheet.create({
  loadingWrapper: { flex: 1, justifyContent: 'center' },
});
