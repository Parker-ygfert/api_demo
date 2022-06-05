import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar'
import SignUp from './User/SignUp'
import './styles/app.sass'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/api_demo" element={<Home />} />
          <Route path="/api_demo/user/sign_up" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
