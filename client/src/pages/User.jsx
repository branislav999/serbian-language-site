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

  if (!progress || !lessons.length) return <p className="text-center mt-10">Loading dashboard...</p>;

  const completed = progress.completedLessons || [];
  const scores = progress.quizScores || {};
  const totalLessons = lessons.length;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username} 👋</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Progress Overview</h2>
        <p>
          Completed Lessons: <strong>{completed.length} / {totalLessons}</strong>
        </p>
        <p>
          Completion Rate: <strong>{Math.round((completed.length / totalLessons) * 100)}%</strong>
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Quiz Scores</h2>
        {Object.keys(scores).length === 0 ? (
          <p className="text-gray-600">No quizzes taken yet.</p>
        ) : (
          <ul className="space-y-2">
            {Object.entries(scores).map(([lessonId, score]) => {
              const lesson = lessons.find((l) => l.id === parseInt(lessonId));
              return (
                <li key={lessonId} className="flex justify-between border-b pb-2">
                  <span>{lesson?.title || `Lesson ${lessonId}`}</span>
                  <span className="text-green-600 font-semibold">{score}</span>
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
