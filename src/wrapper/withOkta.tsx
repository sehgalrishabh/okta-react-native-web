import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { OktaContext } from './OktaContext';

export default (Component: React.FunctionComponent) => {
  const WithAuth = (props: any) => {
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
  return WithAuth;
};

const styles = StyleSheet.create({
  loadingWrapper: { flex: 1, justifyContent: 'center' },
});
