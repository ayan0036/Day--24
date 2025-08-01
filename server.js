 const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');             // ✅ Added CORS
const Student = require('./student');     // Import the schema/model

const app = express();
const port = 3000;

app.use(cors());


app.use(express.json());
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/internshipDB')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving students' });
  }
});


app.get('/student/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving student' });
  }
});

app.get('/add-dummy', async (req, res) => {
  try {
    const newStudent = new Student({
      name: "Qasim",
      email: "qasimansaridiamond@example.com",
      course: "Node.js"
    });
    await newStudent.save();
    res.send("✅ Dummy student added successfully.");
  } catch (err) {
    res.status(500).send("❌ Failed to add dummy student");
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
