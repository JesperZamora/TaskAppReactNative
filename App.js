import * as React from "react";
import "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OverviewScreen from "./screens/OverviewScreen";
import TasksScreen from "./screens/TasksScreen";
import CreateTaskScreen from "./screens/CreateTaskScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebase";

import { View, Text, TouchableOpacity } from "react-native";
import AIScreen from "./screens/AIScreen";

import { RootSiblingParent } from "react-native-root-siblings";
import { myToast } from "./components/myToaster";

export default function App() {
  const Stack = createNativeStackNavigator();
  const auth = getAuth(app);
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#e8ecf4",
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
            },
            contentStyle: { backgroundColor: "#e8ecf4" },
            headerShadowVisible: false,
            headerTintColor: "#222",
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Overview"
            component={OverviewScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await signOut(auth);
                      navigation.navigate("Login");
                      myToast("Logout succesful!", "#039e4f");
                    } catch (error) {
                      console.error("Failed to logout:", error);
                      myToast("Failed to logout!", "red");
                    }
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              ),
              headerLeft: () => <View />,
              gestureEnabled: false,
              headerTitleAlign: "center",
            })}
          />

          <Stack.Screen
            name="Tasks"
            component={TasksScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await signOut(auth);
                      navigation.navigate("Login");
                      myToast("Logout succesful!", "#039e4f");
                    } catch (error) {
                      console.error("Failed to logout:", error);
                      myToast("Failed to logout!", "red");
                    }
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              ),
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen 
            name="AI" 
            component={AIScreen}
            options={{
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen 
            name="Create Task" 
            component={CreateTaskScreen} 
            options={{
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen 
            name="Edit Task" 
            component={EditTaskScreen} 
            options={{
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
