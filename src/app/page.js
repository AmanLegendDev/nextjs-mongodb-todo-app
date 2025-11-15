"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [todos, settodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos", { cache: "no-store" });
    const data = await res.json();
    settodos(data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required bro!");

    if (isEditing) {
      const res = await fetch(`/api/todos/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      await res.json();

      setEditId(null);
      setIsEditing(false);
      settitle("");
      setdescription("");

      fetchTodos();
      return;
    }

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    await res.json();
    fetchTodos();
    settitle("");
    setdescription("");
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    await res.json();
    fetchTodos();
  };

  const handleToggle = async (id, value) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: value }),
    });
    await res.json();
    fetchTodos();
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4"
        >
          <h1 className="text-3xl font-bold text-center">Add Tasks</h1>

          <input
            placeholder="Enter Title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
          />

          <input
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
          />

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 p-3 rounded-md text-white font-semibold transition"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </form>

        {/* TASK LIST */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide mb-4 text-center">All Tasks</h2>

          {todos.length === 0 ? (
            <p className="text-gray-400">No tasks yet bro...</p>
          ) : (
            <ul className="space-y-4">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className="bg-gray-800 p-6 rounded-xl shadow flex items-center justify-between"
                >
                  <div>
                    <p
                      className={`text-lg font-semibold ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.title}
                    </p>
                    <p
                      className={`text-sm ${
                        todo.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-300"
                      }`}
                    >
                      {todo.description}
                    </p>

                    <p className="text-xs text-blue-400 mt-2">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white text-sm font-semibold"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        setEditId(todo._id);
                        setIsEditing(true);
                        settitle(todo.title);
                        setdescription(todo.description);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white text-sm font-semibold"
                    >
                      Edit
                    </button>

                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() =>
                        handleToggle(todo._id, !todo.completed)
                      }
                      className="w-5 h-5 accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
