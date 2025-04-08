import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './styles/styles.css';
import { AuthProvider } from './context/AuthContext';
import { getUser } from './utils/auth';

const user = getUser();
if (user) {
  document.body.classList.add('logged-in');
} else {
  document.body.classList.remove('logged-in');
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
