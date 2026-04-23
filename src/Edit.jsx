import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = 'https://69477a99ca6715d122fa5266.mockapi.io'

function Edit() {
  const { id } = useParams()
  const [todo, setTodo] = useState({
    name: ''
  })

  async function fetchTodos(todoId) {
    try {
      const response = await axios.get(`${BASE_URL}/todos/${todoId}`)
      setTodo(response.data)
    } catch (error) {
      console.error('Error fetching todo:', error)
    }
  }

  useEffect(() => {
    fetchTodos(id)
  }, [id])

  function handleNameChange(event) {
    setTodo((previousState) => ({
        ...previousState,
        name: event.target.value
    }))
  }

  async function updateName() {
    try {
      await axios.put(`${BASE_URL}/todos/${id}`, { name: todo.name })
      alert('Todo updated successfully!')
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  return (
    <>
        <div>Hello edit page {id}</div>
        <div>
            <input 
                type="text" 
                name="name" 
                value={todo.name} 
                onChange={handleNameChange} 
            />

            {todo.status}
        </div>
        <button onClick={() => updateName()}>Edit</button>
        <Link to={`/test-api`}>
            <button>Back</button>
        </Link>
    </>
  )
}

export default Edit