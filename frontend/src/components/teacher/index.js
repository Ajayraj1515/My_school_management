import React, { useState, useEffect } from 'react';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/teachers')
      .then(response => response.json())
      .then(data => setTeachers(data));
  }, []);

  return (
    <div>
      <h1>Teacher List</h1>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.teacher_id}>{teacher.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
