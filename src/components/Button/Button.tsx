import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
interface ButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
}
const Button: FC<ButtonProps> = ({ onPress, text, disabled }) => {
  return (
    <Pressable
      style={[styles.btn, { backgroundColor: disabled ? "gray" : "#000B58" }]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.btn_text}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btn_text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
