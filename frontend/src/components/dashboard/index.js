import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ userType }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      {userType === 'student' && (
        <div>
          <Link to="/students">View Students</Link>
        </div>
      )}
      {userType === 'teacher' && (
        <div>
          <Link to="/teachers">View Teachers</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
