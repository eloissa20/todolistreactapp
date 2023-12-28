import React, { useState, useEffect } from 'react';

const Form = ({ todos, setTodos, editTodo, setEditTodo }) => {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [editInput, setEditInput] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const onFormSubmit = (event) => {
    event.preventDefault();
  
    if (isEditing && selectedTodo) {
        const updatedTodo = {
          id: selectedTodo.id,
          title: editInput,
          description: editDescription,
          completed: selectedTodo.completed,
          created: selectedTodo.created,
          updated: new Date(),
     };
      setTodos(todos.map((todo) => (todo.id === selectedTodo.id ? updatedTodo : todo)));
      setEditTodo('');
      setEditInput('');
      setEditDescription('');
      setIsEditing(false);
      setSelectedTodo(null);
    } else {
      setTodos([...todos, { 
        id: Date.now(), 
        title: input, 
        description: description, 
        completed: false, 
        created: new Date(), 
        updated: null 
      }]);
      setInput('');
      setDescription('');
    }
  };
  
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onEditInputChange = (event) => {
    setEditInput(event.target.value);
  };

  const onEditDescriptionChange = (event) => {
    setEditDescription(event.target.value);
  };

  const handleCancel = () => {
    setEditTodo('');
    setEditInput('');
    setEditDescription('');
    setIsEditing(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    if (editTodo) {
      setEditInput(editTodo.title);
      setEditDescription(editTodo.description || '');
      setSelectedTodo(editTodo);
      setIsEditing(true);
    } else {
      setEditInput('');
      setEditDescription('');
      setSelectedTodo(null);
      setIsEditing(false);
    }
  }, [editTodo]);

  return (
    <div>
        <form onSubmit={onFormSubmit} className="task-form">
            <input
                type="text"
                placeholder="Title:"
                className="task-input"
                value={input}
                required
                onChange={onInputChange}
            />
            <textarea
                placeholder="Description:"
                className="task-input"
                value={description}
                onChange={onDescriptionChange}
                style={{ height: '40px', resize: 'none' }}
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
              placeholder="Update Title"
              className="task-input"
              value={editInput}
              required
              onChange={onEditInputChange}
            />
            <textarea
              placeholder="Update Description"
              className="task-input"
              value={editDescription}
              onChange={onEditDescriptionChange}
              style={{ height: '100px', resize: 'none' }}
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
