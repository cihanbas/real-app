import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { BASE_URL, header } from "../../utils/constants";
import { User } from "../../types/ResponseTypes/Auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/type";
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
const HomeScreen = () => {
  //   const onLayoutRootView = useCallback(async () => {}, []);
  const [data, setData] = useState<User[]>([]);
  const navigation = useNavigation<HomeProps["navigation"]>();
  useEffect(() => {
    console.log("header.token", header.token);
    fetch(`${BASE_URL}/users`, {
      headers: {
        Authorization: "Bearer " + header.token,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        const results = response as User[];
        if (results.length > 0) {
          setData(results);
        } else {
          Alert.alert("uyari", "yetkiniz bulunmamaktadir");
        }
      });
  }, []);
  const logout = async () => {
    // const token = await AsyncStorage.getItem("token");
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView>
      {data.map((item) => {
        return (
          <View key={item._id}>
            <Text>{item.email}</Text>
          </View>
        );
      })}
      <Button text="Logout" onPress={logout} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
