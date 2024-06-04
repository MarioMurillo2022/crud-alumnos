import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Alumnos from './screens/Alumnos';
import InfoAlumnos from './screens/InfoAlumnos';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Alumnos">
        <Stack.Screen name="Alumnos" component={Alumnos} />
        <Stack.Screen name="InfoAlumnos" component={InfoAlumnos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
