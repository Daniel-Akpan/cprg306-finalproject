"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

if (user) {
  // User is signed in, you can access the user's ID
  const userId = user.uid;
} else {
  // No user is signed in.
}

const TodoList = () => {
  // State variables
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [priority, setPriority] = useState("normal"); // New state for priority

  // Fetch tasks from Firestore on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Check if the current user is authenticated
        if (auth.currentUser) {
          const userId = auth.currentUser.userid; // Get the current user's ID
          const querySnapshot = await getDocs(
            query(
              collection(firestore, "todolists"),
              where("userId", "==", userId)
            )
          );
          const taskList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(taskList);
        } else {
          // Handle the case where the user is not authenticated
          // For example, redirect to the login page or show an error message
          console.error("User is not authenticated");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task to Firestore
  const addTask = async () => {
    if (inputValue.trim() !== "") {
      try {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const newTaskRef = await addDoc(collection(firestore, "todolists"), {
          text: inputValue,
          completed: false,
          priority: priority,
          userId: userId, // Add the userId to the task
        });
        const newTask = {
          id: newTaskRef.id,
          text: inputValue,
          completed: false,
          priority: priority,
          userId: userId, // Include the userId in the state
        };
        setTasks([...tasks, newTask]);
        setInputValue("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Toggle completion status of a task
  const toggleCompletion = async (taskId) => {
    try {
      const taskRef = doc(firestore, "todolists", taskId);
      await updateDoc(taskRef, {
        completed: !tasks.find((task) => task.id === taskId).completed,
      });
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task from Firestore
  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc(firestore, "todolists", taskId);
      await deleteDoc(taskRef);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Change priority of a task in Firestore
  const changePriority = async (taskId, priority) => {
    try {
      const taskRef = doc(firestore, "todolists", taskId);
      await updateDoc(taskRef, { priority });
      setTasks(
        tasks.map((task) => (task.id === taskId ? { ...task, priority } : task))
      );
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  // Filter and sort tasks based on filter and sortBy criteria
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.slice().sort((a, b) => {
    if (sortBy === "priority") return a.priority.localeCompare(b.priority);
    if (sortBy === "completed") return a.completed - b.completed;
    return a.text.localeCompare(b.text);
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            className="text-blue-500 cursor-pointer bg-transparent border border-blue-500 px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
            onClick={() => window.history.back()}
          >
            Go Back to profile
          </button>
        </div>
        <div>
          <button className="text-blue-500 cursor-pointer bg-transparent border border-blue-500 px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white">
            <a href="/"> Log Out</a>
          </button>
        </div>
      </div>

      {/* Task list */}
      <div className="border border-gray-300 rounded-md p-4">
        {/* Task input and add button */}
        <div className="flex items-center mb-4">
          {/* Task input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a task..."
            className="flex-grow px-4 py-2 border rounded-md focus:outline-none"
          />
          {/* Priority selection dropdown */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="ml-2 px-3 py-1 border rounded-md focus:outline-none"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>

          <button
            onClick={addTask}
            className="ml-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add Task
          </button>
        </div>
        {/* Sorting options */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label className="font-semibold mr-2">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border rounded-md focus:outline-none"
            >
              <option value="priority">Priority</option>
              <option value="completed">Completed</option>
              <option value="text">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Task items */}
        <ul>
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center py-2 border-b border-gray-300"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                  className="mr-2 focus:outline-none"
                />
                <span
                  className={task.completed ? "line-through text-gray-400" : ""}
                >
                  {task.text}
                </span>
              </div>
              <div>
                <select
                  value={task.priority}
                  onChange={(e) => changePriority(task.id, e.target.value)}
                  className="px-3 py-1 border mr-2 rounded-md focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white font-semibold px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
