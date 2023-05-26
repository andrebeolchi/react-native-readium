/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Reader');
        }}
      >
        <Text
          style={{
            fontSize: 30,
          }}
        >
          Navigate to the Reader tab to read a book.
        </Text>
      </TouchableOpacity>
    </View>
  );
}
