# React tutorial
[doc พี่ไมค์](https://mikelopster.dev/posts/react-start#react-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3) 

## หัวข้อที่จะเรียน
1. React Component / Props ()
2. Condition / Loop
3. React Hook สำหรับจัดการ state
4. React router (React router DOM)

## Init project
`npm create vite@latest my-app -- --template react`

## Example 1
- ใช้ความรูในหัวข้อที่1 - 3

### ที่ `/components/Checkbox.jsx`

```js
export default function Checkbox({ text, isChecked }) {
  return (
    <>
        <div>{text} {isChecked ? "(Done)" : "(Not Done)"}</div>
    </>
  );
}
```
คำอธิบาย
- มีการส่งค่าเข้ามาที่ prop แล้วนำไปเขียนเป็น condition
- หน้านี้จะถูกมองเป็น component 


### ที่ `App.jsx`
```js
import { useState } from "react"
import Checkbox from "./components/Checkbox"

function App() {
  const [counter, setCounter] = useState(0);
  const [todoList, setTodoList] = useState([
    { text: "Learn React", isChecked: false },
    { text: "Build a Todo App", isChecked: true },
  ]);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };
  return (
    <div>
      <h1>Todo</h1>
      {
        todoList.map((item, index) => (
          <Checkbox 
            key={index}
            text={item.text} 
            isChecked={item.isChecked} 
          />
        ))
      }

      <div>
        Now counter is {counter}
        <button onClick={increaseCounter}>Increase Counter</button>
      </div>
    </div>
  );
}

export default App;
```
คำอธิบาย
- import component (Checkbox) มาใช้
- มีการวน loop เพื่อแสดงรายการใน todo list
- จะเห็นภาพของ Hook ชัดเจนจาก ปุ่ม `Increase Counter` เป็นการใช้ `userState` มาจัดการกับ state
-----------

## Example 2
- ใช้ความรู้จากหัวข้อที่ 3 React hook แต่จะเป็นการใช้ `useEffect`

| จุดต่าง              | useState     | useEffect          |
| -------------------- | ------------ | ------------------ |
| หน้าที่              | เก็บข้อมูล   | ทำงานหลัง render   |
| ใช้เมื่อ             | ต้องมี state | ต้องมี side effect |
| ทำให้ render ใหม่ไหม | ✅ ใช่        | ❌ ไม่โดยตรง        |

สรุปง่าย ๆ
- useState = เก็บค่า
- useEffect = ทำอะไรบางอย่างเมื่อเกิดการเปลี่ยนแปลง

### ที่ `/components/Video.jsx`
```js
import { useRef, useEffect } from 'react'

export default function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();  // Calling these while rendering isn't allowed.
    } else {
      ref.current.pause(); // Also, this crashes.
    }
  }, [isPlaying]); // ใส่เพื่อดักการเปลี่ยนแปลงของ prop isPlaying

  

  return <video ref={ref} src={src} loop playsInline />;
}
```

คำอธิบาย
- เมื่อมีการเปลี่ยนแปลง state ของ video useEffect จะทำงาน เช่นเปลี่ยนจาก play -> payse

### ที่ `App.jsx`
```js
import { useState } from "react"
import Checkbox from "./components/Checkbox"
import VideoPlayer from "./components/Video"

function App() {
  const [counter, setCounter] = useState(0)
  const [todoList, setTodoList] = useState([
    { text: "Learn React", isChecked: false },
    { text: "Build a Todo App", isChecked: true },
  ])
  const [isPlaying, setIsPlaying] = useState(false)

  const increaseCounter = () => {
    setCounter(counter + 1);
  }
  function toggleVideo() {
    setIsPlaying(!isPlaying);
  }
  return (
    <div>
      <h1>Todo</h1>
      {
        todoList.map((item, index) => (
          <Checkbox 
            key={index}
            text={item.text} 
            isChecked={item.isChecked} 
          />
        ))
      }

      <div>
        Now counter is {counter}
        <button onClick={increaseCounter}>Increase Counter</button>
      </div>

      <div>
        <div>
          <button onClick={toggleVideo}>
            { isPlaying ? 'Pause' : 'Play' } 
          </button>
        </div>
        <div>
          <VideoPlayer 
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"  
            isPlaying={isPlaying} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
```
คำอธิบาย
- ในตอนเริ่มต้นจะกำหนดค่า isPlaying ให้เป็น false `const [isPlaying, setIsPlaying] = useState(false)`
- เมื่อกดปุ่มจะทำให้ dom Video มี state ที่ดปลี่นนไป

## Example 4
- ใช้ความรู้เรื่อง router
- ต้อง install `npm install react-router-do`

### ที่ `TestPage.jsx`
```js
import { Link } from 'react-router-dom'

export default function Test() {
    return (
        <div>
            <h1>Hello, test page</h1>
            <div>
                <Link to="/">
                    <button>Go to Home Page</button>
                </Link>
            </div>
        </div>
    )
}
```

### ที่ `App.jsx`
```js
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <div>
        <h1>Hello, Home page</h1>
        <Link to="/test">
          <button>Go to Test Page</button>
        </Link>
      </div>
    </>
  )
}

export default App
```
คำอธิบาย
- ที่ `App.jsx`, `TestPage.jsx` ใช้ link เพื่อไปยังหน้าที่ต้องการ

### ที่ `main.jsx`
```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Test from './Test.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
```
คำอธิบาย
- ที่ `main.jsx` จะมีการใช้ createBrowserRouter, RouterProvider เพื่อจัดการ router

## Example 5
- เล่นกับ api จาก [mockapi](https://mockapi.io/projects/69477a99ca6715d122fa5267)
- เป็นการเอา Example 4 มาทำต่อ

### ที่ `TestApi.jsx`
```js
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
```
คำอธิบาย
- ต้อง install axios ก่อน `npm install axios`
- จะเห็นว่ามีการเล่นกับ state ของ `isLoading` เมื่อ fetch data มาครบแล้วจึงแสดงข้อมูล

## ที่ `main.jsx`
```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Test from './TestPage.jsx'
import TestApi from './TestApi.jsx'
import Edit from './Edit.jsx'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/test-api",
    element: <TestApi />,
  },
  {
    path: "/todo/:id",
    element: <Edit />,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
``` 

## ที่ `App.jsx`
```js
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <div>
        <h1>Hello, Home page</h1>
        <div>
           <Link to="/test">
              <button>Go to Test Page</button>
            </Link>
        </div>
        <div>
           <Link to="/test-api">
              <button>Go to Test API Page</button>
            </Link>
        </div>
      </div>
    </>
  )
}

export default App
```

## ที่ `Edit.jsx`
```js
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
```