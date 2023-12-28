import React from "react";

const TodosList = ({ todos, setTodos, setEditTodo, activeTab }) => {
  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) =>
        item.id === todo.id
          ? { 
              ...item, 
              completed: !item.completed,
              completedAt: !item.completed ? new Date() : null
            }
          : item
      )
    );
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
  };

  const handleDelete = (todo) => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "All") return true;
    return todo.completed === (activeTab === "Completed");
  });

  return (
    <div>
      {filteredTodos.map((todo) => (
        <li className="list-item" key={todo.id}>
          <input
            type="checkbox"
            className="checkbox-complete"
            checked={todo.completed}
            onChange={() => handleComplete(todo)}
          />
          <div className="todo-content">
            <input
              type="text"
              className={`todo-title ${todo.completed ? "complete" : ""}`}
              value={todo.title}
              onChange={(e) => e.preventDefault()}
            />
            <p className={`todo-description ${todo.completed ? "complete" : ""}`}>
              {todo.description}
            </p>
          </div>
          <div className="todo-dates">
            {/* Display 'Created on' date and time */}
            <div className="todo-created">
              Created on: {new Date(todo.created).toLocaleDateString()} at {new Date(todo.created).toLocaleTimeString()}
            </div>
            {/* Display 'Completed on' date and time */}
            {todo.completed && todo.completedAt && (
              <div className="todo-completed">
                Completed on: {new Date(todo.completedAt).toLocaleDateString()} at {new Date(todo.completedAt).toLocaleTimeString()}
              </div>
            )}
            {/* Display 'Updated on' date and time */}
            {todo.updated && (
              <div className="todo-updated">
                Last Updated on: {new Date(todo.updated).toLocaleDateString()} at {new Date(todo.updated).toLocaleTimeString()}
              </div>
            )}
          </div>
          <div className="todo-actions">
            {!todo.completed && (
              <button
                className="button-edit task-button"
                onClick={() => handleEdit(todo)}
              >
                <span className="material-icons">edit</span>
              </button>
            )}
            <button
              className="button-delete task-button"
              onClick={() => handleDelete(todo)}
            >
              <span className="material-icons">delete</span>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default TodosList;
