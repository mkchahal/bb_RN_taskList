import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { deleteTask, getAllTasks, addTask } from "../apiUtils";

const Home = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch tasks from the server
  const getTasksList = async () => {
    const res = await getAllTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    getTasksList();
  }, []);

  // Updating the tasks on coming back to Homepage
  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getTasksList();
    });
    return focusHandler;
  }, [navigation]);

  // Delete Task
  const deleteTaskItem = async (id) => {
    const res = await deleteTask(id);
    const list = [...tasks];
    const newArr = list.filter((item) => item._id !== res.data._id);
    setTasks(newArr);
  };

  // Add Task
  const addTaskItem = async () => {
    const res = await addTask(title, content);
    const list = [res.data, ...tasks];
    setTasks(list);
    setTitle("");
    setContent("");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add A New Task"
          placeholderTextColor="#aaa"
          onChangeText={(text) => {
            setTitle(text);
          }}
          value={title}
        />
        <TextInput
          style={styles.input}
          placeholder="Add Notes for the Task..."
          placeholderTextColor="#aaa"
          onChangeText={(text) => {
            setContent(text);
          }}
          value={content}
        />
        <TouchableOpacity style={styles.button} onPress={addTaskItem}>
          <Text styles={styles.buttonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.taskTitle}>{item.title.toUpperCase()}</Text>
              <Text>{item.content}</Text>
              <Text style={styles.taskDate}>
                {item.createdAt.slice(11, 16)} {item.createdAt.slice(0, 10)}
              </Text>
            </View>
            <FontAwesome
              name="pencil"
              color="blue"
              onPress={() => navigation.navigate("Detail", { item })}
              style={styles.icon}
            />
            <FontAwesome
              name="trash-o"
              color="red"
              onPress={() => deleteTaskItem(item._id)}
              style={styles.icon}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "column",
    width: "80%",
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  taskDate: {
    fontSize: 12,
    marginTop: 15,
    color: "#1a1a1a",
  },
  formContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    alignItems: "flex-end",
  },
  input: {
    borderRadius: 5,
    backgroundColor: "white",
    color: '#000',
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    height: 30,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  icon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
});
