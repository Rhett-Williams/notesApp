import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import NewNote from '../screens/NewNote';
import { Types } from '../utils/Types';

export type MainStackParamList = {
    home: undefined
    newNote: {note?: Types.note}
}

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator<MainStackParamList>()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="newNote" component={NewNote} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;