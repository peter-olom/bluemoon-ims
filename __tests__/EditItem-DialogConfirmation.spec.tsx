/**
 * @format
 */

import 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import EditItem from '../src/screens/EditItem';
import {render, waitFor, fireEvent} from '@testing-library/react-native';

describe('EditItem Dialog Confirmation snapshot', () => {
  it('renders correctly', async () => {
    const Stack = createStackNavigator();
    const {getByText, UNSAFE_queryByProps} = render(
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
    fireEvent.press(getByText('Delete'));
    /**
     * would ideally have queried by accessibility helper
     * but could not find any for react-native-elements Dialog
     * UNSAFE_queryByProps works just fine in this case
     */
    const res = await waitFor(() => UNSAFE_queryByProps({visible: true}));
    expect(res).not.toBeNull();
  });
});
