import { useState } from 'react';
import { postData } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = await postData('/users/register', { username, email, password });

    if (data.error) {
      setError(data.error);
    } else {
      login(data.user);
      navigate('/user');
    }
  };

  return (
    <div className="wrapper register active-popup">
      <span className="icon-close" onClick={() => navigate('/')}>×</span>
      <div className="form-box register">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-box">
            <span className="icon">👤</span>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>

          <div className="input-box">
            <span className="icon">📧</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <span className="icon">🔒</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="remember-forgot">
            <label><input type="checkbox" required /> I agree to the terms & conditions</label>
          </div>

          <button type="submit" className="btn">Register</button>
          <div className="login-register">
            <p>
              Already have an account?{' '}
              <a onClick={() => navigate('/login')} className="login-link">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
