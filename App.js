import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Screens/Home";
import Update from "./Screens/Update";
import ViewTask from "./Screens/ViewTask";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Update" component={Update} />
        <Stack.Screen name="ViewTask" component={ViewTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
