import { useEffect, useState } from 'react';
import { getUser } from '../utils/auth';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../utils/api';


function User() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Fetch user's progress
    fetch(`${API_URL}/users/${user.id}/progress`)
      .then(res => res.json())
      .then(data => {
        setProgress(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching progress:', err);
        setLoading(false);
      });

    // Fetch all lessons
    fetch(`${API_URL}/lessons`)
      .then(res => res.json())
      .then(data => setLessons(data))
      .catch(err => console.error('Error fetching lessons:', err));
  }, [user]);

  if (loading || !user) {
    return <p className="dashboard-loading">Loading dashboard...</p>;
  }

  // Set default values if progress data is not available
  const completed = progress?.completedLessons || [];
  const scores = progress?.quizScores || {};
  const totalLessons = lessons.length || 0;
  const completionRate = totalLessons > 0 ? Math.round((completed.length / totalLessons) * 100) : 0;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Welcome, {user.username}</h1>

      <div className="dashboard-card">
        <h2 className="dashboard-subheading">Progress Overview</h2>
        <p>
          Completed Lessons: <strong>{completed.length} / {totalLessons}</strong>
        </p>
        <p>
          Completion Rate: <strong>{completionRate}%</strong>
        </p>
      </div>

      <div className="dashboard-card">
        <h2 className="dashboard-subheading">Quiz Scores</h2>
        {Object.keys(scores).length === 0 ? (
          <p className="dashboard-muted">No quizzes taken yet.</p>
        ) : (
          <ul className="dashboard-score-list">
            {Object.entries(scores).map(([lessonId, score]) => {
              const lesson = lessons.find((l) => l.id === parseInt(lessonId));
              return (
                <li key={lessonId} className="dashboard-score-item">
                  <span>{lesson?.title || `Lesson ${lessonId}`}</span>
                  <span className="score-value">{score}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default User;