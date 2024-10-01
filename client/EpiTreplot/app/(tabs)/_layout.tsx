import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home'; // Assuming you have a home screen

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}