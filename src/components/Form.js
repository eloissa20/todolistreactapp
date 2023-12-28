import React, { useState, useEffect } from 'react';

const Form = ({ todos, setTodos, editTodo, setEditTodo }) => {
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (isEditing && selectedTodo) {
      const updatedTodo = {
        id: selectedTodo.id,
        title: editInput,
        completed: selectedTodo.completed,
      };
      setTodos(todos.map((todo) => (todo.id === selectedTodo.id ? updatedTodo : todo)));
      setEditTodo('');
      setEditInput('');
      setIsEditing(false);
      setSelectedTodo(null);
    } else {
      setTodos([...todos, { id: Date.now(), title: input, completed: false }]);
      setInput('');
    }
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onEditInputChange = (event) => {
    setEditInput(event.target.value);
  };

  const handleCancel = () => {
    setEditTodo('');
    setEditInput('');
    setIsEditing(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    if (editTodo) {
      setEditInput(editTodo.title);
      setSelectedTodo(editTodo);
      setIsEditing(true);
    } else {
      setEditInput('');
      setSelectedTodo(null);
      setIsEditing(false);
    }
  }, [editTodo]);

  return (
    <div>
      <form onSubmit={onFormSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="text"
          placeholder="Enter a Task"
          className="task-input"
          value={input}
          required
          onChange={onInputChange}
        />
        <button className="button-add" type="submit">
          Add
        </button>
      </form>
      {isEditing && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h3>Update Task</h3>
            <input
              type="text"
              placeholder="Update Task"
              className="task-input"
              value={editInput}
              required
              onChange={onEditInputChange}
            />
            <div className="popup-buttons">
              <button className="button-update" onClick={onFormSubmit}>Update</button>
              <button className="button-cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
