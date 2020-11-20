import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import TransactionScreen from './Screens/BookedTransactionsScreen';
import SearchScreen from './Screens/SearchScreen';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
export default class App extends Component {
  render(){
  return <AppContainer/>
  
}
}
const tabNavigator = createBottomTabNavigator({
  Transaction: {screen: TransactionScreen},
  Search: {screen: SearchScreen}
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ({})=>{
      const routeName = navigation.state.routeName
      if(routeName === 'Transaction'){
        return(<Image source = {require('./assets/book.png')}
        style = {{width: 40, height: 40}}/>)
      }
      else if(routeName === 'Search'){
        return(<Image source = {require('./assets/searchingbook.png')}
        style = {{width: 40, height: 40}}/>)
      }
    }
  })
})
const AppContainer = createAppContainer(tabNavigator);