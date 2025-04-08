import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/lessons/${id}`)
      .then(res => res.json())
      .then(data => setLesson(data))
      .catch(err => console.error('Error fetching lesson:', err));
  }, [id]);

  if (!lesson) return <p className="text-center mt-10">Loading lesson...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
      <p className="mb-8">{lesson.content}</p>
      <button
        onClick={() => navigate(`/quizzes/${lesson.id}`)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Take Quiz
      </button>
      <a
      href={`/pdfs/lesson-${lesson.id}.pdf`}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Download Lesson PDF
    </a>
    </div>
  );
}

export default LessonDetail;
