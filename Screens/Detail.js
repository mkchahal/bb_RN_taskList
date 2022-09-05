import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const activeTask = route.params.item;

  // Update Task
  const updateTaskItem = async (id) => {
    const res = await updateTask(id, title, content);
    const list = [...tasks];
    list.map((item) => (item._id === res.data._id ? res.data : item));
    setTasks(list);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.inputField} value={activeTask.title} placeholder="Update Task Title"/>
      <TextInput style={styles.inputField} value={activeTask.content} placeholder="Update Task Content"/>
      <Pressable style={styles.buttonUpdate} onPress={() => updateTaskItem(activeTask._id)}>
        <Text>Update Task</Text>
      </Pressable>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
