import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading";
import { RootStackParamList } from "../../navigations/type";
import { User } from "../../types/ResponseTypes/Auth";
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
interface ListItem {
  item: User;
  index: number;
}
let interval: NodeJS.Timeout;
const UsersScreen = () => {
  const { data, isPending, error, isSuccess, isError, isLoading, refetch } =
    useQuery({
      queryKey: ["getUsers"],
      queryFn: () =>
        fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
          res.json()
        ),
      enabled: false,
    });
  const navigation = useNavigation<HomeProps["navigation"]>();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isSuccess) {
      //   alert("BASARILI");
      success();
    }
  }, [isSuccess]);
  const success = () => {};
  useEffect(() => {
    if (isError) {
      alert("BASARISIZ");
    }
  }, [isError]);
  useEffect(() => {
    interval = setInterval(() => {
      console.log("interval");
    }, 1000);
  }, []);
  useEffect(() => {
    if (isFocused == false) {
      clearInterval(interval);
    }
  }, [isFocused]);
  const logout = async () => {
    // const token = await AsyncStorage.getItem("token");
    await AsyncStorage.removeItem("token");

    navigation.navigate("Login");
  };
  const renderItem = ({ item, index }: ListItem) => {
    return (
      <Pressable>
        <Text>{item.email}</Text>
      </Pressable>
    );
  };
  console.log("UsersScreen ", isLoading);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data || []}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      {isLoading && <Loading />}

      <Button text="Re Fetch" onPress={() => refetch()} />
      <Button text="Logout" onPress={() => logout()} />
    </SafeAreaView>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal_content: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",

    borderRadius: 10,
  },
});
