/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationAction, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from './src/screens/Main'
import DetailsScreen from './src/screens/DetailsScreen';
import TrailerScreen from './src/screens/TrailerScreen';
import {Provider} from "react-redux"
import { legacy_createStore as createStore} from 'redux'
import reducers from "./src/redux"
 
const Stack = createNativeStackNavigator()

const App = () =>{
const store = createStore(reducers)
  return (
    <Provider store={store}> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen}/>
        <Stack.Screen name="TrailerScreen" component={TrailerScreen} options={{ orientation: 'all' }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}


export default App;
