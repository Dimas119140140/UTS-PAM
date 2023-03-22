import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from "./SCREEN/home";
import Detail from "./SCREEN/detail";
import Profile from "./SCREEN/profile";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
  <NavigationContainer>
   <Tab.Navigator>
        <Tab.Screen name="Home" 
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}

        />
        <Tab.Screen name="Detail" component={Detail} />
        <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
  </NavigationContainer>
 
  );
}
