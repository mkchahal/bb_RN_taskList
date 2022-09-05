import { Alert } from "react-native";

export const validEntry = (title, content) => {
  if (!title || !content) {
    Alert.alert("All fields are required.");
    return false;
  } else return true;
};
