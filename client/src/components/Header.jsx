import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  return (
    <header className="header">
      <h2 className="logo">Learn Serbian</h2>
      <nav className="navigation">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/lessons">Lessons</Link>
            <Link to="/quizzes">Quizzes</Link>
            <Link to="/culture">Cultural Insights</Link>
            <Link to="/user">Dashboard</Link>
            <button className="btnLogin-popup" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="btnLogin-popup" onClick={() => navigate('/login')}>Log In</button>
            <button className="btnSignup-popup" onClick={() => navigate('/register')}>Sign Up</button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
