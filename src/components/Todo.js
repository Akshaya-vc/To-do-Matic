import React, { useState, useRef , useEffect } from "react";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(!true);
  const [newName, setNewName] = useState("");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  
  const wasEditing = usePrevious(isEditing);
  useEffect(() => {
    if(!wasEditing && isEditing){
      editFieldRef.current.focus();
    }
    if(wasEditing && !isEditing){
      editButtonRef.current.focus();
    }
  },[wasEditing,isEditing]);

  function handleSubmit(e) {
    e.preventDefault();
    if (newName !== "") props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }
  function handleChange(e) {
    setNewName(e.target.value);
  }

  const editingTemplate = (
    <form className="stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          onChange={handleChange}
          ref={editFieldRef}
          id={props.id}
          className="todo-text"
          type="text"
        />
      </div>
      <div className="btn-group">
        <button
          onClick={() => setEditing(false)}
          type="button"
          className="btn todo-cancel"
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn__primary todo-edit"
        >
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          onClick={() => setEditing(true)}
          ref={editButtonRef}
          type="button"
          className="btn"
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );
   useEffect(() => {
     if(isEditing){
       editFieldRef.current.focus();
     }
     
   },[isEditing]);

  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}
