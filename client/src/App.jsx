import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import Quizzes from './pages/Quizzes';
import QuizDetail from './pages/QuizDetail';
import User from './pages/User';
import Culture from './pages/Culture';
import Layout from './components/Layout';
import { getUser } from './utils/auth';

function App() {
  const user = getUser();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/user" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/user" />} />
          <Route path="/lessons" element={user ? <Lessons /> : <Navigate to="/login" />} />
          <Route path="/lessons/:id" element={user ? <LessonDetail /> : <Navigate to="/login" />} />
          <Route path="/quizzes" element={user ? <Quizzes /> : <Navigate to="/login" />} />
          <Route path="/quizzes/:id" element={user ? <QuizDetail /> : <Navigate to="/login" />} />
          <Route path="/user" element={user ? <User /> : <Navigate to="/login" />} />
          <Route path="/culture" element={user ? <Culture /> : <Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
