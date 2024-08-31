import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import StudentList from './components/student';
import TeacherList from './components/teacher';
import './App.css';

const App = () => {
  const [userType, setUserType] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
    // Decode token to get userType or any other user information
    // For example:
    // const decodedToken = jwtDecode(token);
    // setUserType(decodedToken.role);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login onLogin={handleLogin} setUserType={setUserType} />
        </Route>
        <Route path="/students">
          {token ? <StudentList /> : <Login onLogin={handleLogin} setUserType={setUserType} />}
        </Route>
        <Route path="/teachers">
          {token ? <TeacherList /> : <Login onLogin={handleLogin} setUserType={setUserType} />}
        </Route>
        <Route path="/">
          {token ? <Dashboard userType={userType} /> : <Login onLogin={handleLogin} setUserType={setUserType} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
