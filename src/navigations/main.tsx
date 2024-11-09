import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroductionScreen from "../screens/Intro/IntroductionScreen";
import RegisterScreen from "../screens/Register/RegisterScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import { RootStackParamList } from "./type";
import HomeScreen from "../screens/Home/HomeScreen";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="introduction"
          component={IntroductionScreen}
        ></Stack.Screen>
        <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          listeners={{
            transitionEnd: () => SplashScreen.hideAsync(),
          }}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          listeners={{
            transitionEnd: () => SplashScreen.hideAsync(),
          }}
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
