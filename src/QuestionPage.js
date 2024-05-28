import React, { useState, useEffect } from 'react';
import './App.css';

function QuestionsPage() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [id, setId] = useState(0); 
    const [showFetchButton, setShowFetchButton] = useState(true);
    const [studentId, setStudentId] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showNextButton, setShowNextButton] = useState(true);
    const [submitClicked, setSubmitClicked] = useState(false);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerVisible, setTimerVisible] = useState(false);

    useEffect(() => {
        let interval;
        if (!submitClicked && !showFeedbackForm) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [submitClicked, showFeedbackForm]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const questions = () => {
        setSelectedOption(null); 
        fetch('http://localhost:5000/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id }), 
        })
        .then(res => res.json())
        .then(data => { 
            if(data.question === "none"){
                setShowFetchButton(false);
                setQuestion(" ");
                setOptions([]);
                setShowNextButton(false);
                setTimerVisible(true); 
            } else {
                setQuestion(data.question); 
                setOptions(data.options);
                setCorrectAnswer(data.correctAnswer);
                setStudentId(data.name);
                setId(id + 1); 
                setShowFetchButton(false);
                setShowNextButton(true);
                setTimerVisible(true); 
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const renderOptions = () => {
        return options.map((option, index) => (
            <div className="radio-container" key={index}>
                <input 
                    type="radio" 
                    id={`option${index + 1}`} 
                    name="options" 
                    value={index} 
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                />
                <label htmlFor={`option${index + 1}`}>{option}</label>
            </div>
        ));
    };

    const handleSubmit = () => {
        setSubmitClicked(true);
    };

    const handleNext = () => {
        const selectedOptionIndex = selectedOption;
        if (selectedOptionIndex !== null) {
            if (selectedOptionIndex === correctAnswer) {
                setScore(score + 1);
                fetch('http://localhost:5000/updateScore', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ studentId: studentId, score: score}),
                })
                .then(res => res.json())
                .catch(error => console.error('Error updating score:', error));
            }
        }
        questions(); 
        setShowFetchButton(false); 
        setShowNextButton(false);
    };

    const handleFeedback = () => {
        setShowFeedbackForm(true);
        setTimerVisible(false); 
    };

    return (
        <div style={{height:"400px"}}>
            {timerVisible &&<h2 style={{marginTop:"0px"}}>Timer: {formatTime(timer)}</h2>}
            {!showFeedbackForm && (
                <div>
                    {showFetchButton && (
                        <div className='qd1'>
                            {/* <h2>Quiz Question</h2> */}
                            <h3>Instructions :</h3>
                            <h4>Read the following instructions properly and start the test</h4>
                            <ul className='u1'>
                                <li>Each question has one correct option and carries one mark.</li>
                                <li>You can visit the questions once and no negative marking.</li>
                                <li>Next button click prohibits from re-visiting the questions.</li>
                                <li>After submission of the test your results will be displayed.</li>
                            </ul>
                            <button className='b1' onClick={questions}>Start Test</button>
                            
                        </div>
                    )}
                    {!showFetchButton && showNextButton && (
                        <div className='qd1'>
                            <h4 className='p1'>{id} . {typeof question === 'object' ? JSON.stringify(question) : question}</h4>
                            {renderOptions()}
                            <button className='qb1' onClick={handleNext}>Next </button>
                        </div>
                    )}
                    {!showFetchButton && !showNextButton && (
                        <div className='qd2'>
                            <center>
                                {question === " " && <h3 style={{paddingTop:"30px"}}>Are you sure you want to Submit ?</h3>}
                                {question === " " && <button className='b1' onClick={handleSubmit}>Submit</button>}
                                {submitClicked && <p className='p2'>Score: 6</p>}
                                {submitClicked && <h4>Thanks For Attempting the Test!!</h4>}
                                {submitClicked && <button className='b3' onClick={handleFeedback}>Feedback</button>}
                            </center>
                        </div>
                    )}
                </div>
            )}
            {showFeedbackForm && (
                <div style={{display:"block"}}>
                    <h2 style={{marginTop:"70px"}}>Feedback Form</h2>
                    <textarea id="msg" name="msg" placeholder='Type your feedback here...'
                      rows="10" cols="50" required> 
                    </textarea>
                    <br></br>
                    <button className='b4'>Submit</button>
                </div>
            )}
        </div>
    );
}

export default QuestionsPage;
