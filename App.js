import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodayScreen from "./screens/TodayScreen";
import WeekScreen from "./screens/WeekScreen";
import SettingScreen from "./screens/SettingScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Today" component={TodayScreen} />
        <Tab.Screen name="Week" component={WeekScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
