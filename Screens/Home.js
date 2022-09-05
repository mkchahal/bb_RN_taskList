import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { deleteTask, getAllTasks, updateTask, addTask } from "../apiUtils";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigation = useNavigation();

  // Fetch tasks from the server
  const getTasksList = async () => {
    const res = await getAllTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    getTasksList();
  }, []);

  // Delete Task
  const deleteTaskItem = async (id) => {
    const res = await deleteTask(id);
    const list = [...tasks];
    list.filter((item) => item._id !== res.data._id);
    setTasks(list);
  };

  // Update Task
  const updateTaskItem = async (id) => {
    const res = await updateTask(id, title, content);
    const list = [...tasks];
    list.map((item) => (item._id === res.data._id ? res.data : item));
    setTasks(list);
  };

  // Add Task
  const addTaskItem = async () => {
    const res = await addTask(title, content);
    const list = [res.data, ...tasks];
    setTasks(list);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
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
        <TouchableOpacity style={styles.button} onPress={addTask}>
            <Text styles={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={tasks} numColumns={1}/>
    </View>
  );
};

export default Home;
