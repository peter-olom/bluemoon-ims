/**
 * @format
 */

import 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../src/screens/Home';
import {fireEvent, render, act} from '@testing-library/react-native';
import EditItem from '../src/screens/EditItem';
// import {act} from 'react-test-renderer';

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    getItem: async () => {
      return JSON.stringify([
        {
          id: 1,
          name: 'Lexus IS250',
          stock: 5,
          price: 36000,
          description: 'Very chilled ride',
          timestamp: 1234,
        },
      ]);
    },
  };
});

describe('Verify inventory navigation', () => {
  it('should navigate to edit screen', async () => {
    const Stack = createStackNavigator();
    const {queryByText, findByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inventory" component={Home} />
          <Stack.Screen name="Edit Item" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    await act(async () => {
      const el = await findByText('Lexus IS250');
      fireEvent.press(el);
      const res = queryByText('Edit Item');
      expect(res).not.toBeNull();
    });
  });
});
