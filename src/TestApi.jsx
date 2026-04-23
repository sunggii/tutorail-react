import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const BASE_URL = 'https://69477a99ca6715d122fa5266.mockapi.io'

function App() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchTodos() {
    try {
      const response = await axios.get(`${BASE_URL}/todos`)
      setTodos(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  async function deleteTodo(id) {
    try {
      setIsLoading(true)
      await axios.delete(`${BASE_URL}/todos/${id}`)
      await fetchTodos()
      setIsLoading(false)
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        <div>
          <h1>Test API Page</h1>
          <Link to={`/`}>
            <button>Go to Home Page</button>
          </Link>
          {
            todos.map(todo => (
              <div key={todo.id}>
                {todo.id} {todo.name} {todo.status}

                <Link to={`/todo/${todo.id}`}>
                  <button>Edit</button>
                </Link>
                <button
                  onClick={async () => {
                    await deleteTodo(todo.id)
                  }}
                >Delete
                </button>
              </div>
            ))
          }
        </div>
      }
    </>
  )
}

export default App