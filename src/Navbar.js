import { Link } from "react-router-dom";
import './styles/navbar.sass'

const Navbar = ({ fixed }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/api_demo">API Demo</Link>
        </div>
        <div className="login">
          <Link to="/api_demo/user/sign_in" className="sign-in">Sign-In</Link>
          <Link to="/api_demo/user/sign_up" className="sign-up">Sign-Up</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
