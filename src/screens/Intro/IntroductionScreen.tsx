import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/type";
type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "introduction"
>["navigation"];

const IntroductionScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  useEffect(() => {
    navigation.navigate("Login");
  }, []);
  return (
    <View>
      <Text>IntroductionScreen</Text>
    </View>
  );
};

export default IntroductionScreen;

const styles = StyleSheet.create({});
