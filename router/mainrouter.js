const { generateMessage , getAllQuestions,getAllStudents } = require('../controller/maincontroller');
var data='';
const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();
router.post("/user/login", async function (req, res) {    
  const { username, password } = req.body;
  try {
      data= await generateMessage(username, password,'student');  
      res.status(201).json({ message: data});

  } catch (error) {
      console.error("Error generating message:", error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/admin/login", async function (req, res) {   
const { username, password } = req.body;
try {
    data = await generateMessage(username, password,'administrator');        
    res.status(201).json({ message: data });
    console.log( data);
} catch (error) {
    console.error("Error generating message:", error);
    res.status(500).json({ message: 'Internal server error' });
}
});


const uri = "mongodb://localhost:27017";
const dbName = "quiz";
const client = new MongoClient(uri);
const db = client.db(dbName);
const usersCollection = db.collection("student");

router.post("/questions", async function (req, res) { 
    const { id } = req.body;  
    try {
        const data1 = await  getAllQuestions(id);      
        res.json({ question : data1.question ,options:data1.options, correctAnswer:data1.correctAnswer,name:data});
    } catch (error) {
        console.error("Error generating message:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/updateScore', (req, res) => {
  const { studentId, score } = req.body;
  const collection = db.collection('student');

  collection.updateOne(
   
    { username: studentId }, 
    { $set: { score: score+1 } }, 
    (err, result) => {
      if (err) {
        console.error('Error updating score:', err);
        res.status(500).send('Error updating score');
      } else {
        console.log('Score updated successfully');
        res.status(200).send('Score updated successfully');
      }
    }
  );
});




router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
      const existingUser = await usersCollection.findOne({ username });
      const score=0;
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const newUser = await usersCollection.insertOne({ username, password, score});
      res.status(201).json({ message: 'Signup successful'});
    } catch (err) {
      console.error("Error signing up:");
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get("/students", async function (req, res) {
    try {
        const students = await getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;