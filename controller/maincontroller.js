const { connect } = require('../model/mainmodel');
async function generateMessage(username, password,cred) {
    try {
        const db = await connect();
        const usersCollection = db.collection(cred);
        const user = await usersCollection.findOne({ username });
        if (!user) { 
            return 'incorrect username or password';          
        }
        if (user.password !== password) {  
            return 'incorrect username or password'; 
        }
    console.log("Success. ", user.username + " " + user.password);

    return user.username;
    } catch (error) {
    console.log("Error logging in:", error);
    throw error;
    }
} 


async function getAllQuestions(id) {
    try {
        const db = await connect();
        const questionsCollection = db.collection('question');
        const questions = await questionsCollection.find().toArray(); 
        
        const updatedQuestions = questions.map(question => {
            const optionsArray = Array.isArray(question.options) ? question.options : [question.options];
            return {
                ...question,
                options: optionsArray
            };
        });
        if(id>=updatedQuestions.length){
            return {question:"none"};
        }
        console.log(updatedQuestions[id]);
        return updatedQuestions[id];
    } catch (error) {
        console.error("Error retrieving questions:", error);
        throw error;
    }
} 
async function getAllStudents() {
    try {
        const db = await connect();
        const studentsCollection = db.collection('student');
        const students = await studentsCollection.find().toArray();
        const sortedStudents = students.sort((a, b) => b.score - a.score);
        return sortedStudents;
    } catch (error) {
        console.error("Error retrieving students:", error);
        throw error;
    }
}


module.exports = { generateMessage ,getAllQuestions ,getAllStudents};
