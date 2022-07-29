import axios from "axios";
import React, { useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  useEffect(()=>{
    async function getData(){
      const res = await axios.get("http://localhost:3000/note/all")
      setTodos(res.data.data);
      console.log(res.data.data)
        return res;
      }
    getData().then(res=>{ 
    })
    getData().catch(err=>console.log(err));
  },[])

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/note/add",{name:todo}).then(res=>{
   setTodos([...todos, res.data.data])})
   setTodo("")
  }

  function deleteTodo(id) {
    axios.delete(`http://localhost:3000/note/delete/${id}`)
    let updatedTodos = [...todos].filter((todo) => todo._id !== id);
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    axios.patch(`http://localhost:3000/note/update/${id}`,{name:editingText})
    const updatedTodos = [...todos].map((todo) => {
      if (todo._id === id) {
        todo.name = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo._id} className="todo">
          <div className="todo-text">
            {todo._id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.name}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo._id === todoEditing ? (
              <button onClick={() => submitEdits(todo._id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo._id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;