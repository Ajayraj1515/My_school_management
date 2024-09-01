import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import StudentList from './components/student';
import TeacherList from './components/teacher';
import jwtDecode from 'jwt-decode';  // Assuming you have jwt-decode installed
import './App.css';

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      token ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const App = () => {
  const [userType, setUserType] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
    // Decode token to get userType or any other user information
    const decodedToken = jwtDecode(token);
    setUserType(decodedToken.role); // Assuming 'role' is part of the decoded token
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {token ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
        </Route>
        
        <PrivateRoute path="/students" component={StudentList} token={token} />
        <PrivateRoute path="/teachers" component={TeacherList} token={token} />
        
        <PrivateRoute 
          path="/" 
          component={() => <Dashboard userType={userType} />} 
          token={token} 
        />
        
        {/* Optional: Redirect unknown paths */}
        <Redirect to={token ? "/" : "/login"} />
      </Switch>
    </Router>
  );
};

export default App;
