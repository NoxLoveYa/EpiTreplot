import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './workspace'; // Assuming you have a home screen
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {display: 'none'}, headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}