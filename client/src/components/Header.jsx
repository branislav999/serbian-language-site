import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-xl font-bold">
          <Link to="/">Learn Serbian</Link>
        </h1>
        <nav className="space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <>
              <Link to="/lessons" className="hover:underline">Lessons</Link>
              <Link to="/quizzes" className="hover:underline">Quizzes</Link>
              <Link to="/culture" className="hover:underline">Culture</Link>
              <Link to="/user" className="hover:underline">Dashboard</Link>
              <button onClick={handleLogout} className="hover:underline ml-2">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
