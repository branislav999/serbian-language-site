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
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Lessons</h1>
      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <Link
            to={`/lessons/${lesson.id}`}
            key={lesson.id}
            className="block bg-white p-4 rounded shadow hover:bg-gray-100 transition"
          >
            <h2 className="text-xl font-semibold">{lesson.title}</h2>
            <p className="text-gray-600">{lesson.course}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
