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