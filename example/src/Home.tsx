import React from 'react';
import { Text, View } from 'react-native';
import { withOkta } from 'okta-react-native-web';

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default withOkta(Home);
