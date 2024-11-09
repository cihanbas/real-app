import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Input from "../../components/input/input";
import PasswordInput from "../../components/input/passwordInput";
import Button from "../../components/Button/Button";
import { BASE_URL, header } from "../../utils/constants";
import { LoginSuccessResponse } from "../../types/ResponseTypes/Auth";
import Loading from "../../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props extends NativeStackScreenProps<RootStackParamList, "Login"> {}
const LoginScreen = () => {
  const navigation = useNavigation<Props["navigation"]>();
  const [email, setEmail] = useState("cihan3@bas.com");
  const [password, setPassword] = useState("testpass");
  const [loading, setLoading] = useState(false);
  const login = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = {
      email: email,
      password: password,
    };
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((response) => {
        const { token, user } = response as LoginSuccessResponse;
        if (user) {
          AsyncStorage.setItem("token", token);
          header.token = token;
          navigation.navigate("Home");
        } else {
          Alert.alert(
            "Uyari",
            "Girdiginiz bilgiler hatali, lutfen tekrar deneyiniz"
          );
        }
        console.log("user", user);
      })
      .catch((er) => {
        console.log("er", er);
      })
      .finally(() => {
        setLoading(false);
      });

    //
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}>
        <Image
          style={styles.logo}
          source={require("../../../assets/appLogo.jpg")}
        ></Image>
      </View>

      <Input
        labelText="Email"
        value={email}
        placeholder="Email adresinizi giriniz"
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <PasswordInput
        labelText="Sifre"
        value={password}
        placeholder="Sifrenizi giriniz"
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button onPress={login} text="Giris Yap" />
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    padding: 10,
    backgroundColor: "white",
  },
  input_container: {
    marginBottom: 8,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgb(237, 241, 255)",
  },
  logo_container: {
    alignItems: "center",
  },
  logo: {
    height: 200,
    width: 200,
  },
});
