import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  
import { createStackNavigator } from '@react-navigation/stack';
import BookList from './screens/bookslistscreen';
import BookDetail from './screens/booksdetailsscreen';
import { BookProvider } from './bookcontext';
import Borrowed from './screens/borrowedscreen';
import { Ionicons } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="BookList">
      <Stack.Screen name="BookList" component={BookList} />
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <BookProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
          
              if (route.name === 'Books') {
                iconName = focused ? 'book' : 'book-outline'; 
              } else if (route.name === 'Borrow') {
                iconName = focused ? 'library' : 'library-outline'; 
              }
             
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato', 
            inactiveTintColor: 'gray', 
          }}
        >
          <Tab.Screen name="Books" component={HomeStack} />
          <Tab.Screen name="Borrow" component={Borrowed} />
        </Tab.Navigator>
      </NavigationContainer>
    </BookProvider>
  );
}
