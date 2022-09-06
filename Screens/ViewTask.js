import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getTask } from "../Utils/apiUtils";
import { updateDateFormat } from "../Utils/conversionUtils";

const ViewTask = ({ route }) => {
  const navigation = useNavigation();
  const activeTask = route.params.item;
  const [currentTask, setCurrentTask] = useState({});

  // Get Task
  const getTaskItem = async (id) => {
    const res = await getTask(id);
    const taskObj = Object.assign(
      res.data,
      { createdAt: updateDateFormat(res.data.createdAt) },
      { updatedAt: updateDateFormat(res.data.updatedAt) }
    );
    setCurrentTask(taskObj);
  };

  useEffect(() => {
    getTaskItem(activeTask._id);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.taskTitle}>{currentTask.title}</Text>
        <Text style={styles.taskContent}>{currentTask.content}</Text>
        <Text style={styles.taskDate}>Last Updated: {currentTask.updatedAt}</Text>
        <Text style={styles.taskDate}>Posted On: {currentTask.createdAt}</Text>
      </View>
      <Pressable
        style={styles.buttonGoBack}
        onPress={() => navigation.navigate("Home")}
      >
        <Text>{`<< Go Back`}</Text>
      </Pressable>
    </View>
  );
};

export default ViewTask;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },
  innerContainer: {
    backgroundColor: "#e5e5e5",
    padding: 20,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    alignItems: "center",
  },
  taskTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 24,
  },
  taskContent: {
    textAlign: "center",
    fontSize: 18,
    margin: 16
  },
  taskDate: {
    color: "#3a3b3c",
  },
  buttonGoBack: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "#0de065",
  },
});
