import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';

function Quizzes() {
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/lessons')
      .then(res => res.json())
      .then(data => setLessons(data));

    const user = getUser();
    if (user) {
      fetch(`http://localhost:3000/users/${user.id}/progress`)
        .then(res => res.json())
        .then(data => setProgress(data));
    }
  }, []);

  const quizScores = progress.quizScores || {};

  return (
    <div class="quizzes-container">
      <h1 class="quizzes-title">Available Quizzes</h1>
      <div class="quizzes-grid">
        {lessons.map((lesson) => (
          <div key={lesson.id} class="quiz-card">
            <div class="quiz-info">
              <h2 class="quiz-title">{lesson.title}</h2>
              <p class="quiz-course">Course: {lesson.course}</p>
            </div>
            <div class="quiz-actions">
              {quizScores[lesson.id] !== undefined ? (
                <p class="quiz-score">
                  Score: {quizScores[lesson.id]} <span class="quiz-checkmark">✓</span>
                </p>
              ) : (
                <p class="quiz-not-taken">Not taken</p>
              )}
              <Link
                to={`/quizzes/${lesson.id}`}
                class="quiz-button"
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