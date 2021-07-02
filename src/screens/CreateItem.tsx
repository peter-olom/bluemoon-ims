/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {Button, Dialog, Input, Text} from 'react-native-elements';
import Db from '../db';
import {InventoryItem, BlueMoonScreenProps} from '../types';

const db = new Db();
const itemZero = {
  name: '',
  price: 0,
  stock: 0,
  description: '',
};

export default function CreateItem({}: BlueMoonScreenProps<'Create Item'>): JSX.Element {
  const [item, setItem] = useState<InventoryItem>(itemZero as InventoryItem);
  const [unqueItems, setUniqueItems] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState<[boolean, string]>([false, '']);

  useEffect(() => {
    async function init() {
      setUniqueItems(await db.getInvertoryNames());
    }
    init();
  }, []);

  const nameIsUnique = (v: string): boolean => {
    return unqueItems.find(s => s === v) ? false : true;
  };

  const submitForm = async () => {
    // validate the data
    if (item.name.trim() === '' || nameIsUnique(item.name) === false) {
      return setErrors({...errors, name: true});
    }
    if (item.stock <= 0 && isNaN(item.stock) === false) {
      return setErrors({...errors, stock: true});
    }
    if (item.price <= 0 && isNaN(item.price) === false) {
      return setErrors({...errors, price: true});
    }
    if (
      item.description.trim() === '' ||
      item.description.split(' ').length < 3
    ) {
      return setErrors({...errors, description: true});
    }

    if ((await db.add(item)) === true) {
      setNotice([true, 'Inventory item added']);
      setItem(itemZero as InventoryItem);
    } else {
      setNotice([true, 'Failed to add inventory item']);
    }
  };

  return (
    <View style={{padding: 10}}>
      <Text style={{marginBottom: 20, paddingLeft: 10}} h4>
        Add Item
      </Text>
      <Input
        value={item.name}
        inputContainerStyle={styles.inputCs}
        placeholder="Name"
        onChangeText={v => {
          setItem({...item, name: v});
          setErrors({...errors, name: false});
        }}
        errorMessage={errors.name ? 'Name is required' : ''}
      />
      <Input
        value={String(item.stock || '')}
        inputContainerStyle={styles.inputCs}
        placeholder="Total stock"
        keyboardType="numeric"
        onChangeText={v => {
          setItem({...item, stock: Number(v)});
          setErrors({...errors, stock: false});
        }}
        errorMessage={
          errors.stock ? 'Total stock is required and should be a number' : ''
        }
      />
      <Input
        value={String(item.price || '')}
        inputContainerStyle={styles.inputCs}
        placeholder="Price"
        keyboardType="numeric"
        onChangeText={v => {
          setItem({...item, price: Number(v)});
          setErrors({...errors, price: false});
        }}
        errorMessage={
          errors.price ? 'Price is required and should be a number' : ''
        }
      />
      <Input
        value={item.description}
        inputContainerStyle={styles.inputCs}
        inputStyle={styles.multilineText}
        placeholder="Description"
        multiline={true}
        numberOfLines={10}
        onChangeText={v => {
          setItem({...item, description: v});
          setErrors({...errors, description: false});
        }}
        errorMessage={
          errors.description
            ? 'Description is required and must be atleast 3 words'
            : ''
        }
      />
      <Button
        onPress={submitForm}
        title="Submit"
        containerStyle={{marginHorizontal: 10}}
      />
      <Dialog
        isVisible={notice[0]}
        onBackdropPress={() => setNotice([false, ''])}>
        <Dialog.Title title="Alert" />
        <Text>{notice[1]}</Text>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  inputCs: {
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 8,
  },
  multilineText: {
    textAlignVertical: 'top',
  },
});
