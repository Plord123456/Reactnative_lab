import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Contact from './ContactComponent'; // Import Contact component
import About from './AboutComponent'; 
import Home from './HomeComponent';

function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <HomeNavigator.Screen name='Home' component={Home} />
    </HomeNavigator.Navigator>
  );
}

function MenuNavigatorScreen() {
  const MenuNavigator = createStackNavigator();
  return (
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <MenuNavigator.Screen name='Menu' component={Menu} />
      <MenuNavigator.Screen name='Dishdetail' component={Dishdetail} options={{ headerTitle: 'Dish Detail' }} />
    </MenuNavigator.Navigator>
  );
}

function AboutNavigatorScreen() {
  const AboutNavigator = createStackNavigator();
  return (
    <AboutNavigator.Navigator
      initialRouteName='About Us'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <AboutNavigator.Screen name='About Us' component={About} />
    </AboutNavigator.Navigator>
  );
}

function ContactNavigatorScreen() {
  const ContactNavigator = createStackNavigator();
  return (
    <ContactNavigator.Navigator
      initialRouteName='Contact Us'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ContactNavigator.Screen name='Contact Us' component={Contact} />
    </ContactNavigator.Navigator>
  );
}
//1.1.6.2
function MainNavigatorScreen() {
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator initialRouteName='HomeScreen'>
      <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen} options={{ title: 'Home', headerShown: false }} />
      <MainNavigator.Screen name='MenuScreen' component={MenuNavigatorScreen} options={{ title: 'Menu', headerShown: false }} />
      <MainNavigator.Screen name='AboutScreen' component={AboutNavigatorScreen} options={{ title: 'About Us', headerShown: false }} />
      <MainNavigator.Screen name='ContactScreen' component={ContactNavigatorScreen} options={{ title: 'Contact Us', headerShown: false }} />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
         {/* <MenuNavigatorScreen />  */}
         <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
}
export default Main;