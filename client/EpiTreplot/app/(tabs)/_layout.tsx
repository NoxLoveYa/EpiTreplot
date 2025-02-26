import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkspaceScreen from './workspace';
import HomeScreen from './home';
import ProfileScreen from './profile';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/workspace');

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {display: 'none'}, headerShown: false}}>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name="Workspace" component={WorkspaceScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}