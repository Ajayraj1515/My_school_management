const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./controllers/studentController');
const teacherRoutes = require('./controllers/teacherController');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/api/login', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
