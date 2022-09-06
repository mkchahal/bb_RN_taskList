import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { deleteTask, getAllTasks, addTask } from "../Utils/apiUtils";
import { validEntry } from "../Utils/validationUtils";
import { updateDateFormat } from "../Utils/conversionUtils";

const Home = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sorted, setSorted] = useState(false);

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
    if (validEntry(title, content)) {
      const res = await addTask(title, content);
      const list = [res.data, ...tasks];
      setTasks(list);
      setTitle("");
      setContent("");
    }
  };

  const handleSort = () => {
    setSorted(!sorted);

    const factor = sorted ? 1 : -1;
    const list = [...tasks];
    const sortedArr = list.sort((a, b) => {
      return factor * (Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
    });
    setTasks(sortedArr);
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
      <Pressable style={styles.buttonContainer} onPress={handleSort}>
        <FontAwesome name="sort" color="black" style={styles.icon} />
        <Text>Sort By Date</Text>
      </Pressable>
      <FlatList
        data={tasks}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Pressable style={styles.innerContainer} onPress={() => navigation.navigate("ViewTask", { item })}>
              <Text style={styles.taskTitle}>{item.title.toUpperCase()}</Text>
              <Text>{item.content}</Text>
              <Text style={styles.taskDate}>
                {updateDateFormat(item.createdAt)}
              </Text>
            </Pressable>
            <FontAwesome
              name="pencil"
              color="blue"
              onPress={() => navigation.navigate("Update", { item })}
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 10,
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
    color: "#000",
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
    fontSize: 20,
    marginLeft: 14,
    marginRight: 7,
  },
});
