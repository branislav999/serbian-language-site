import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../utils/auth';

function QuizDetail() {
  const { id } = useParams(); // lesson ID
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
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selected,
    }));
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3000/quizzes/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId: parseInt(id),
        answers,
      }),
    });

    const result = await response.json();
    setScore(result.score);
    setSubmitted(true);

    // Optional: update user progress
    const user = getUser();
    if (user) {
      const progressRes = await fetch(`http://localhost:3000/users/${user.id}/progress`);
      const progressData = await progressRes.json();

      const updatedProgress = {
        ...progressData,
        completedLessons: [
          ...(progressData.completedLessons || []),
          parseInt(id),
        ],
        quizScores: {
          ...(progressData.quizScores || {}),
          [id]: result.score,
        },
      };

      await fetch(`http://localhost:3000/users/${user.id}/progress`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: updatedProgress }),
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          {questions.map((q) => (
            <div key={q.id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold mb-2">{q.question}</p>
              {q.options.map((option, index) => (
                <label key={index} className="block mb-1">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleOptionChange(q.id, option)}
                    className="mr-2"
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Quiz
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Score: {score} / {questions.length}</h2>
          <p className="text-lg">Progress has been saved 🎉</p>
        </div>
      )}
    </div>
  );
}

export default QuizDetail;
