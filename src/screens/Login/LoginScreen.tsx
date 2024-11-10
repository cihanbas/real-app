import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import Input from "../../components/input/input";
import PasswordInput from "../../components/input/passwordInput";
import Loading from "../../components/Loading";
import { RootStackParamList } from "../../navigations/type";
import { api_header, BASE_URL, header } from "../../utils/constants";
import ErrorModal from "../../components/Modal/ErrorModal";
import { Formik } from "formik";
import { LoginSchema } from "../../utils/schema";
interface RequestBody {
  email: string;
  password: string;
}
interface Props extends NativeStackScreenProps<RootStackParamList, "Login"> {}
const LoginScreen = () => {
  const navigation = useNavigation<Props["navigation"]>();

  const [modalVisible, setModalVisible] = useState(false);
  const { data, isPending, mutate, isSuccess, isError, error } = useMutation({
    mutationKey: ["Login"],
    mutationFn: (body: RequestBody) =>
      fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: api_header(),
      }).then((res) => res.json()),
  });

  const login = (email: string, password: string) => {
    const body: RequestBody = {
      email: email,
      password: password,
    };
    mutate(body);
  };
  useEffect(() => {
    if (isSuccess && data?.token) {
      responseSuccess(data.token);
    }
    if (isSuccess && data.message) {
      responseError(data.message);
    }
    console.log("data", data);
  }, [isSuccess]);
  const responseSuccess = (token: string) => {
    AsyncStorage.setItem("token", token);
    header.token = token;
    navigation.navigate("Home");
  };
  const responseError = (message: string) => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}>
        <Image
          style={styles.logo}
          source={require("../../../assets/appLogo.jpg")}
        ></Image>
      </View>
      <Formik
        initialValues={{ email: "cihan3@bas.com", password: "testpass" }}
        onSubmit={(values) => {
          login(values.email, values.password);
        }}
        validationSchema={LoginSchema}
      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => {
          return (
            <>
              <Input
                labelText="Email"
                value={values.email}
                placeholder="Email adresinizi giriniz"
                onChangeText={handleChange("email")}
                errorText={errors && errors.email}
              />
              <PasswordInput
                labelText="Sifre"
                value={values.password}
                placeholder="Sifrenizi giriniz"
                onChangeText={handleChange("password")}
                errorText={errors && errors.password}
              />
              <Button
                onPress={handleSubmit}
                text="Giris Yap"
                disabled={!isValid}
              />
            </>
          );
        }}
      </Formik>
      {isPending && <Loading />}
      <ErrorModal
        errorText={data && data.message}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
