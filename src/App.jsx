import { Link } from 'react-router-dom'
import Header from './components/Header.jsx'
import { IconA } from './components/Icon.jsx'

function App() {
  return (
    <>
      <Header />
      <div>
        <h1>Hello, Home page</h1>
        <IconA />
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