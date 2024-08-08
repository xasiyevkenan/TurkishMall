import React, {useEffect} from 'react';
import {AppRegistry, StatusBar, StyleSheet, View} from 'react-native';
import Router from 'router/Router';

function App(): React.JSX.Element {
  return (
    <View style={styles.root}>
      <StatusBar barStyle={'dark-content'} />
      <Router />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default App;
