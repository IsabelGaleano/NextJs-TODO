import { useState, useEffect } from "react";
import shortid from "shortid";
import Button from "../../components/Button/Button";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");


  const getWebsites = async () => {
    try {
      const fetchWebsites = await fetch('/api/tasks', {
        method: 'GET'
      });

      if (!fetchWebsites.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await fetchWebsites.json();
      console.log(res);
    } catch (error) {
      console.error('There was a problem fetching the website data:', error.message);
    }
  }

  const createTask = async () => {
    const newTask = {
        id: "PPBqWA1",
        text: "Tasks Done",
        done: false
    };

    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('There was a problem creating the task:', error.message);
    }
};

const updateTask = async () => {
  const newTaskUp = {
      id: "PPBqWA1",
      text: "Tasks Ready",
      done: true,
      reference: "hqsMVpAlb038IQ9zPLq9"
  };

  try {
      const response = await fetch('/api/tasks', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTaskUp)
      });
      

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('There was a problem updating the task:', error.message);
  }
};

const deleteTask = async () => {
  const reference = "I9cqof29pOLg3TvNktoc";

  try {
    const response = await fetch(`/api/tasks?reference=${reference}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('There was a problem deleting the task:', error.message);
  }
};


  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: shortid.generate(), text: input, done: false }]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <Button text="Get" onClick={getWebsites} />
      <Button text="Post" onClick={createTask} />
      <Button text="Put" onClick={updateTask} />
      <Button text="Delete" onClick={deleteTask} />
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo"
        />
        <Button type="submit" text="Add Todo" />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.done ? "done" : ""}`}>
            <input
              type="text"
              value={todo.text}
              onChange={(e) => updateTodo(todo.id, e.target.value)}
              className="edit"
            />
            <span onClick={() => markTodo(todo.id)}>{todo.text}</span>
            <Button className="delete" onClick={() => deleteTodo(todo.id)} text="Delete" />
          </li>
        ))}
      </ul>
    </div >
  );
};

export default TodoApp;