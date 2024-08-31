import React, { useState, useEffect } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map(student => (
          <li key={student.student_id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
