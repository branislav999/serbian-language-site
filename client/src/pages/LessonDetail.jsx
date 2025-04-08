import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetch(`https://serbian-language-site.onrender.com/lessons/${id}`)
      .then(res => res.json())
      .then(data => setLesson(data))
      .catch(err => console.error('Error fetching lesson:', err));
  }, [id]);

  if (!lesson) return <p className="lesson-loading">Loading lesson...</p>;

  return (
    <div className="lesson-detail-container">
      <h1 className="lesson-detail-title">{lesson.title}</h1>
      <p className="lesson-detail-content">{lesson.content}</p>

      <div className="lesson-actions">
        <button
          onClick={() => navigate(`/quizzes/${lesson.id}`)}
          className="btn primary-btn"
        >
          Take Quiz
        </button>
        <a
          href={`/pdfs/lesson-${lesson.id}.pdf`}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="btn secondary-btn"
        >
          Download Lesson PDF
        </a>
      </div>
    </div>
  );
}

export default LessonDetail;
