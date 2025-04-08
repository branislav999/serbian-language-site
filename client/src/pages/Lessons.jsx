import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Lessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/lessons')
      .then(res => res.json())
      .then(data => setLessons(data))
      .catch(err => console.error('Error fetching lessons:', err));
  }, []);

  return (
    <div className="lessons-container">
      <h1 className="lessons-heading">Lessons</h1>
      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <Link
            to={`/lessons/${lesson.id}`}
            key={lesson.id}
            className="lesson-card"
          >
            <h2 className="lesson-title">{lesson.title}</h2>
            <p className="lesson-subtext">{lesson.course}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
