import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";
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
import Loading from "../../components/Loading";
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
interface ListItem {
  item: User;
  index: number;
}
let renderCount = 0;
const HomeScreen = () => {
  //   const onLayoutRootView = useCallback(async () => {}, []);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const navigation = useNavigation<HomeProps["navigation"]>();
  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((response) => {
        SplashScreen.hideAsync();
        const results = response as User[];
        if (results.length > 0) {
          setData(results);
        } else {
          if (response?.message) {
            setError(response.message);
            setVisible(true);
          }
          // Alert.alert("uyari", "yetkiniz bulunmamaktadir");
        }
      })
      .catch((er) => {
        console.log("er", er);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
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
  console.log("Home ", loading);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      <Button text="Logout" onPress={logout} />

      {loading && <Loading />}
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <Pressable style={styles.modal} onPress={() => setVisible(false)}>
          <View style={styles.modal_content}>
            <Text>{error}</Text>
            <Button text="Tamam" onPress={() => setVisible(false)}></Button>
          </View>
        </Pressable>
      </Modal>
      <Button text="Go to Users" onPress={() => navigation.navigate("Users")} />
    </SafeAreaView>
  );
};

export default HomeScreen;

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
