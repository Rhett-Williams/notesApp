import { StyleSheet } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';

const App = () => {

  return (
        <NavigationContainer>
          <MainStackNavigator/>
        </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});