/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Icon, ListItem, Text} from 'react-native-elements';
import {NAIRA} from '../constants';
import Db from '../db';
import {InventoryItem, BlueMoonScreenProps} from '../types';

const db = new Db();

const keyExtractor = (item: InventoryItem, index: number) => index.toString();

export default function Home({
  navigation,
}: BlueMoonScreenProps<'Inventory'>): JSX.Element {
  const [list, setList] = useState<InventoryItem[]>([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setList(await db.fetchData());
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item}: {item: InventoryItem}) => (
    <ListItem
      onPress={() => navigation.navigate('Edit Item', {edit: item})}
      bottomDivider>
      <Icon name="category" />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>Stock: {item.stock}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content>
        <ListItem.Title>
          {NAIRA}
          <Text h3>{item.price}</Text>
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
  return (
    <View style={{padding: 10}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>Touch an item to view</Text>
        <Icon
          reverse
          name="add"
          onPress={() => navigation.navigate('Create Item')}
        />
      </View>
      <FlatList
        style={{marginVertical: 20}}
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
    </View>
  );
}
