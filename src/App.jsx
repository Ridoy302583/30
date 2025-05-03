import React, { useState, useEffect } from 'react'
import { 
  FaPlus, 
  FaTrash, 
  FaCheck, 
  FaTag, 
  FaExclamationCircle 
} from 'react-icons/fa'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [input, setInput] = useState('')
  const [category, setCategory] = useState('Personal')
  const [priority, setPriority] = useState('Medium')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (input.trim()) {
      const newTodo = { 
        id: Date.now(), 
        text: input, 
        completed: false,
        category,
        priority,
        createdAt: new Date().toLocaleString()
      }
      setTodos([...todos, newTodo])
      setInput('')
      setCategory('Personal')
      setPriority('Medium')
    }
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTodos = {
    Active: todos.filter(todo => !todo.completed),
    Completed: todos.filter(todo => todo.completed)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-websparks-primary">
        Advanced Todo List
      </h1>
      
      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo" 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-websparks-primary"
        />
        
        {/* Category and Priority Selects */}
        <div className="flex space-x-2">
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
          >
            <option>Personal</option>
            <option>Work</option>
            <option>Shopping</option>
            <option>Health</option>
          </select>
          
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          
          <button 
            onClick={addTodo}
            className="bg-websparks-primary text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Active Todos */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Active Tasks</h2>
        <div className="space-y-2">
          {filteredTodos.Active.map(todo => (
            <div 
              key={todo.id} 
              className={`flex items-center p-3 rounded-lg bg-gray-100`}
            >
              <button 
                onClick={() => toggleComplete(todo.id)}
                className="mr-3 text-gray-400 hover:text-green-500"
              >
                <FaCheck />
              </button>
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <span>{todo.text}</span>
                  <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(todo.priority)}`}>
                    {todo.priority}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <FaTag className="mr-1" /> {todo.category}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Created: {todo.createdAt}
                </div>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Todos */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Completed Tasks</h2>
        <div className="space-y-2">
          {filteredTodos.Completed.map(todo => (
            <div 
              key={todo.id} 
              className="flex items-center p-3 rounded-lg bg-green-100 line-through text-gray-500"
            >
              <FaCheck className="mr-3 text-green-500" />
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <span>{todo.text}</span>
                  <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(todo.priority)}`}>
                    {todo.priority}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
