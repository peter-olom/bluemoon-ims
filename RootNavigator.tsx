import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import {StackParamList} from './src/types';
import CreateItem from './src/screens/CreateItem';
import EditItem from './src/screens/EditItem';
import {APP_NAME} from './src/constants';

const Stack = createStackNavigator<StackParamList>();

export default function RootNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#00000000', elevation: 0},
        }}>
        <Stack.Screen
          name="Inventory"
          component={Home}
          options={{title: APP_NAME}}
        />
        <Stack.Screen
          name="Create Item"
          component={CreateItem}
          options={{title: APP_NAME}}
        />
        <Stack.Screen
          name="Edit Item"
          component={EditItem}
          options={{title: APP_NAME}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
