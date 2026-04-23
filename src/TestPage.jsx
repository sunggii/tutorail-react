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