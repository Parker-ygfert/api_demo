import './styles/navbar.sass'

const Navbar = ({ fixed }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <a href="/api_demo">API Demo</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
