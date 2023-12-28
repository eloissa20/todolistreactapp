import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import TodosList from "./components/TodosList";
import "./App.css";

const App = () => {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);
  const [activeTab, setActiveTab] = useState("ToDo");

  useEffect(() => {
    console.log(todos); 
  }, [todos]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <Header />

        <Form
          todos={todos}
          setTodos={setTodos}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
        />

        <div className="tabs">
          <button
            className={`tab ${activeTab === "ToDo" ? "active-tab" : ""}`}
            onClick={() => handleTabChange("ToDo")}
          >
            To Do
          </button>
          <button
            className={`tab ${activeTab === "Completed" ? "active-tab" : ""}`}
            onClick={() => handleTabChange("Completed")}
          >
            Completed
          </button>
        </div>

        <TodosList
          todos={todos}
          setTodos={setTodos}
          setEditTodo={setEditTodo}
          activeTab={activeTab} 
        />
      </div>
    </div>
  );
};

export default App;
