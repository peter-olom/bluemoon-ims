/**
 * @format
 */

import 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import EditItem from '../src/screens/EditItem';
import {render, waitFor} from '@testing-library/react-native';

describe('EditItem snapshot', () => {
  it('renders correctly', async () => {
    const Stack = createStackNavigator();
    const {queryByText, toJSON} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Edit Item"
            initialParams={{
              edit: {
                name: 'Lexus IS250',
                stock: 5,
                price: 36000,
                description: 'Very chilled ride',
              },
            }}
            component={EditItem}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const res = await waitFor(() => queryByText('Edit Item'));
    expect(res).not.toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });
});
