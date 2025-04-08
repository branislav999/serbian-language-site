import { useEffect, useState } from 'react';
import { getUser } from '../utils/auth';

function User() {
  const user = getUser();
  const [progress, setProgress] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/users/${user.id}/progress`)
      .then(res => res.json())
      .then(data => setProgress(data));

    fetch('http://localhost:3000/lessons')
      .then(res => res.json())
      .then(data => setLessons(data));
  }, [user]);

  if (!progress || !lessons.length)
    return <p className="dashboard-loading">Loading dashboard...</p>;

  const completed = progress.completedLessons || [];
  const scores = progress.quizScores || {};
  const totalLessons = lessons.length;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Welcome, {user.username}</h1>

      <div className="dashboard-card">
        <h2 className="dashboard-subheading">Progress Overview</h2>
        <p>
          Completed Lessons: <strong>{completed.length} / {totalLessons}</strong>
        </p>
        <p>
          Completion Rate: <strong>{Math.round((completed.length / totalLessons) * 100)}%</strong>
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
