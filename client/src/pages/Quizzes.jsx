import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';

function Quizzes() {
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    // 1. Get all lessons
    fetch('http://localhost:3000/lessons')
      .then(res => res.json())
      .then(data => setLessons(data));

    // 2. Get user's quiz progress
    const user = getUser();
    if (user) {
      fetch(`http://localhost:3000/users/${user.id}/progress`)
        .then(res => res.json())
        .then(data => setProgress(data));
    }
  }, []);

  const quizScores = progress.quizScores || {};

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Quizzes</h1>
      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p className="text-sm text-gray-600">Course: {lesson.course}</p>
            </div>
            <div className="text-right">
              {quizScores[lesson.id] !== undefined ? (
                <p className="text-green-600 font-semibold">
                  Score: {quizScores[lesson.id]} ✓
                </p>
              ) : (
                <p className="text-gray-500 italic">Not taken</p>
              )}
              <Link
                to={`/quizzes/${lesson.id}`}
                className="inline-block mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Take Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quizzes;
