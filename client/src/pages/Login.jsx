import { useState } from 'react';
import { postData } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { mail, lockClosed, close } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext'; // This is all you need

function Login() {
  const [loginCredential, setLoginCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // This gives you access to the login function

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login submitted");
    
    try {
      const data = await postData('/users/login', { loginCredential, password });
      console.log("Login response:", data);
      
      if (data.error) {
        setError(data.error);
      } else {
        console.log("Login successful, saving user");
        login(data.user); // This updates both localStorage and the context state
        
        console.log("User saved, navigating to /user");
        navigate('/user'); 
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
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