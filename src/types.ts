import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type InventoryItem = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  timestamp: number;
};

export type StackParamList = {
  Inventory: undefined;
  'Edit Item': {edit: InventoryItem};
  'Create Item': undefined;
};

export interface BlueMoonScreenProps<S extends keyof StackParamList> {
  navigation: StackNavigationProp<StackParamList, S>;
  route: RouteProp<StackParamList, S>;
}
