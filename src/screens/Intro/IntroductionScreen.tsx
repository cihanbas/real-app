import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { header } from "../../utils/constants";
import Button from "../../components/Button/Button";
type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "introduction"
>["navigation"];

const IntroductionScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  useEffect(() => {
    const token = AsyncStorage.getItem("token").then((t) => {
      if (t) {
        header.token = t;
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
    console.log("token", token);
  }, []);
  return (
    <View>
      <Text>IntroductionScreen</Text>
      <Button text="Go to Home" onPress={() => navigation.navigate("Users")} />
    </View>
  );
};

export default IntroductionScreen;

const styles = StyleSheet.create({});
