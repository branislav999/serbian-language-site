import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../utils/auth';

function QuizDetail() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/quizzes/lesson/${id}`)
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error('Error fetching quiz:', err));
  }, [id]);

  const handleOptionChange = (questionId, selected) => {
    setAnswers(prev => ({ ...prev, [questionId]: selected }));
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3000/quizzes/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId: parseInt(id), answers }),
    });

    const result = await response.json();
    setScore(result.score);
    setSubmitted(true);

    const user = getUser();
    if (user) {
      const progressRes = await fetch(`http://localhost:3000/users/${user.id}/progress`);
      const progressData = await progressRes.json();

      const currentCompleted = progressData.completedLessons || [];
      const lessonId = parseInt(id);

      const updatedCompleted = currentCompleted.includes(lessonId)
        ? currentCompleted
        : [...currentCompleted, lessonId];

      const updatedProgress = {
        ...progressData,
        completedLessons: updatedCompleted,
        quizScores: { ...(progressData.quizScores || {}), [id]: result.score },
      };


      await fetch(`http://localhost:3000/users/${user.id}/progress`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: updatedProgress }),
      });
    }
  };

  return (
    <div class="quiz-detail-container">
      <h1 class="quiz-detail-title">Quiz</h1>
      
      {!submitted ? (
        <form class="quiz-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {questions.map((q) => (
            <div key={q.id} class="question-card">
              <p class="question-text">{q.question}</p>
              <div class="options-container">
                {q.options.map((option, index) => (
                  <label key={index} class="option-label">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => handleOptionChange(q.id, option)}
                      class="option-input"
                      required
                    />
                    <span class="option-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" class="submit-button">
            Submit Quiz
          </button>
        </form>
      ) : (
        <div class="results-container">
          <h2 class="results-title">Your Score: {score} / {questions.length}</h2>
          <p class="results-message">Progress has been saved </p>
        </div>
      )}
    </div>
  );
}

export default QuizDetail;