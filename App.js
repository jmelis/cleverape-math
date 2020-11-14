import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import GameResults from './screens/GameResults';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Select Level' }}/>
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: 'Play!' }}/>
        <Stack.Screen name="GameResults" component={GameResults} options={{ title: 'Results' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;