import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { styles } from "./styles";
interface Props {
  labelText: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  errorText?: string;
}
const Input = (props: Props) => {
  return (
    <View style={styles.input_container}>
      <Text>{props.labelText}</Text>
      <TextInput
        style={styles.input}
        value={props.value}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        onChangeText={(text) => props.onChangeText(text)}
        placeholder={props.placeholder || props.labelText}
      ></TextInput>
      {props.errorText && (
        <Text style={styles.errorText}>{props.errorText}</Text>
      )}
    </View>
  );
};

export default Input;
