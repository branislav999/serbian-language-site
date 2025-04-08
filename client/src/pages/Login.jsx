import { useState } from 'react';
import { postData } from '../utils/api';
import { saveUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { mail, lockClosed, close } from 'ionicons/icons';

function Login() {
  const [loginCredential, setLoginCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await postData('/users/login', { loginCredential, password });

    if (data.error) {
      setError(data.error);
    } else {
      saveUser(data.user);
      window.location.href = '/user';
    }
  };

  return (
    <div className="wrapper">
      <span className="icon-close" onClick={() => navigate('/')}>
        <IonIcon icon={close} />
      </span>
      
      <div className="form-box login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <span className="icon">
              <IonIcon icon={mail} />
            </span>
            <input
              type="text"
              value={loginCredential}
              onChange={(e) => setLoginCredential(e.target.value)}
              required
            />
            <label>Email or Username</label>
          </div>
          
          <div className="input-box">
            <span className="icon">
              <IonIcon icon={lockClosed} />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          
          {error && <p className="error-text">{error}</p>}
          
          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="#">Forgot Password?</a>
          </div>
          
          <button type="submit" className="btn">Login</button>
          
          <div className="login-register">
            <p>Don't have an account? <a href="#" onClick={() => navigate('/register')}>Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;