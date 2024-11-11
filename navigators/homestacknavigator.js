import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookList from '../screens/bookslistscreen';
import BookDetail from '../screens/booksdetailsscreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="BookList">
      <Stack.Screen name="BookList" component={BookList} />
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  );
}
