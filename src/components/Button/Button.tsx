import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
interface ButtonProps {
  onPress: () => void;
  text: string;
}
const Button: FC<ButtonProps> = ({ onPress, text }) => {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text style={styles.btn_text}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#000B58",
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
