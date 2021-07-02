/**
 * @format
 */

import 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CreateItem from '../src/screens/CreateItem';
import {render, waitFor} from '@testing-library/react-native';

describe('CreateItem snapshot', () => {
  it('renders correctly', async () => {
    const Stack = createStackNavigator();
    const {queryByText, toJSON} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Create Item" component={CreateItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const res = await waitFor(() => queryByText('Create Item'));
    expect(res).not.toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });
});
