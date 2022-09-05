import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAllTasks, updateTask } from "../apiUtils";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const activeTask = route.params.item;
  const [taskTitle, setTaskTitle] = useState(activeTask.title);
  const [taskContent, setTaskContent] = useState(activeTask.content);

  // Update Task
  const updateTaskItem = async (id) => {
    const res = await updateTask(id, taskTitle, taskContent);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        value={taskTitle}
        onChangeText={setTaskTitle}
        placeholder="Update Task Title"
      />
      <TextInput
        style={styles.inputField}
        value={taskContent}
        onChangeText={setTaskContent}
        placeholder="Update Task Content"
      />
      <Pressable
        style={styles.buttonUpdate}
        onPress={() => updateTaskItem(activeTask._id)}
      >
        <Text>Update Task</Text>
      </Pressable>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },
  inputField: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: "#000",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "#0de065",
  },
});
