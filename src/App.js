import React, { useState , useRef, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterBtn from "./components/FilterBtn";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);



function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App(props) {


  const  listHeadingRef = useRef(null);

  const [tasks, setTasks] = useState(props.tasks);
  
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
    //creates new tasks for all values inside tasks
    //It spreads all of its inside value
    //same as tasks.0 task.1 tasks.2
  }
  function deleteTask(id) {
    //console.log(id);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  const [filter, setFilter] = useState("All");
  const filterList = FILTER_NAMES.map((name) => (
    <FilterBtn 
      key={name} 
      name={name} 
      isPressed = {name === filter}
      setFilter = {setFilter}
    />
  ));
  //console.log(tasks);
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
  //console.log(tasks);
  //each item of tasks is task.
  //map 1.takes a data item unbundles it,
  //2.performs whatever operation given after map(item => (operation here))
  //3.returns a new data item of same type
  const noun = taskList.length === 1 ? "task" : "tasks";
  const countingText = `${taskList.length} ${noun} remaining`;

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if(tasks.length - prevTaskLength === -1){
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 tabIndex="-1" ref={listHeadingRef} id="list-heading">{countingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
