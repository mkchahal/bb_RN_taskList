import axios from "axios";
const SERVER_URL = "http://localhost:4000"

export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/task`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTask = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/task/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addTask = async (title, content) => {
  try {
    const response = await axios.post(`${SERVER_URL}/task`, {
      title,
      content,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (id, title, content) => {
  try {
    const response = await axios.put(`${SERVER_URL}/task/${id}`, {
      title,
      content
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/task/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
