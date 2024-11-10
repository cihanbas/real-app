import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import Feather from "@expo/vector-icons/Feather";
interface Props {
  labelText: string;
  placeholder?: string;
  value: string;
  errorText?: string;
  onChangeText: (text: string) => void;
}
const PasswordInput = (props: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const updateSecureTextEntry = () => {
    setSecureTextEntry((prev) => !prev);
  };
  return (
    <View style={styles.input_container}>
      <Text>{props.labelText}</Text>
      <View style={styles.password_container}>
        <TextInput
          style={styles.input}
          value={props.value}
          onChangeText={(text) => props.onChangeText(text)}
          placeholder={props.placeholder || props.labelText}
          secureTextEntry={secureTextEntry}
        ></TextInput>

        <Pressable onPress={updateSecureTextEntry}>
          <Feather
            name={secureTextEntry ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      {props.errorText && (
        <Text style={styles.errorText}>{props.errorText}</Text>
      )}
    </View>
  );
};

export default PasswordInput;
