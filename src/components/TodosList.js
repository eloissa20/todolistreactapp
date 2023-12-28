import React from "react";

const TodosList = ({ todos, setTodos, setEditTodo }) => {

    const handleComplete = (todo) => {
        setTodos(todos.map(item => item.id === todo.id ? { ...item, completed: !item.completed } : item));
    };

    const handleEdit = (todo) => {
        setEditTodo(todo);
    };

    const handleDelete = (todo) => {
        setTodos(todos.filter(item => item.id !== todo.id));
    };

    return (
        <div>
            {todos.map((todo) => (
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
                            value={todo.title} 
                            className={`todo-title ${todo.completed ? "complete" : ""}`}
                            onChange={(e) => e.preventDefault()}
                        />
                        <p className={`todo-description ${todo.completed ? "complete" : ""}`}>
                            {todo.description}
                        </p>
                    </div>
                    <div className="todo-actions">
                        <button className="button-edit task-button" onClick={() => handleEdit(todo)}>
                            <span className="material-icons">edit</span>
                        </button>
                        <button className="button-delete task-button" onClick={() => handleDelete(todo)}>
                            <span className="material-icons">delete</span>
                        </button>
                    </div>
                </li>
            ))}
        </div>
    );
}

export default TodosList;
