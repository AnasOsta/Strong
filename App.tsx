import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { User, UserContext } from "./Context/UserContext";
import { useContext, useState } from "react";
import { DataContext, Data } from "./Context/DataContext";

import Icon from "react-native-vector-icons/Ionicons";
import Profile from "./src/BottomTab/Profile";
import History from "./src/BottomTab/History";
import Admin from "./src/BottomTab/Admin";
import Workout from "./src/BottomTab/Workout";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
function TabNavigator() {
  const { user, setUser } = useContext(UserContext);
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      activeColor="#FFFFFF"
      barStyle={{ backgroundColor: "#C5C5C5" }}
      shifting={false}
      screenOptions={(route) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let rn = route.route.name;

          if (rn === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === "Workout") {
            iconName = focused ? "add" : "add-outline";
          } else if (rn === "History") {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === "Admin") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Icon name={iconName} size={25} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Profile" component={Profile} />
      {user.id !== "null" && (
        <>
          <Tab.Screen name="History" component={History} />
          <Tab.Screen name="Workout" component={Workout} />
        </>
      )}
      {user[0]?.rule == "admin" && (
        <Tab.Screen name="Admin" component={Admin} />
      )}
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User>({
    id: "null",
    name: "null",
    email: "null",
    rule: "null",
  });
  const [data, setData] = useState<Data>([]);
  const [dataHistory, setDataHistory] = useState<Data>([]);
  return (
    <DataContext.Provider
      value={{ data, setData, dataHistory, setDataHistory }}
    >
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <StatusBar
            style="dark"
            backgroundColor="#C5C5C5"
            translucent={false}
          />
          <TabNavigator />
        </NavigationContainer>
      </UserContext.Provider>
    </DataContext.Provider>
  );
}
