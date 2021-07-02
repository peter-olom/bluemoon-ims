/**
 * @format
 */

import 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../src/screens/Home';
import {render, waitFor} from '@testing-library/react-native';

describe('Home snapshot', () => {
  it('renders correctly', async () => {
    const Stack = createStackNavigator();
    const {queryByText, toJSON} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inventory" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const res = await waitFor(() => queryByText('Inventory'));
    expect(res).not.toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });
});
