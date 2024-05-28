import React, { useState } from 'react';
import QuestionPage from './QuestionPage';
import './App.css';

export default function Student() {
    const [showQuestionPage, setShowQuestionPage] = useState(false);
    const [sign,setSign]=useState(false);
    const [mess,setMess]=useState(false);
    const callLogin = () => {
        var userName = document.getElementById('username').value;
        var Password = document.getElementById('password').value;
        fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: userName, password: Password }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); 
            let result = userName.localeCompare(data.message); 
            console.log(result); 
            if (result === 0) {
                setShowQuestionPage(true); 
            }
            else{
                setMess(true);
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const callSignUp = () => {
        var user = document.getElementById('username').value;
        var pass = document.getElementById('password').value;
        const postData = {
            username: user,
            password: pass
        };
        setSign(true);
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Signup successful:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            {showQuestionPage ? (
                <QuestionPage />
            ) : (
                <center>
                    <div className='d1'>
                        <center>
                            <div className='d2'>
                                <label > 
                                    <input className='in1' type="text" id='username' placeholder='username'/>
                                </label>
                                <br></br>
                                <br></br>
                                <label> 
                                    <input className='in1' type="text" id='password' placeholder='password'/>
                                </label>
                                <br></br>
                                <br></br>
                                <button className="b2" onClick={callLogin}>
                                    Login
                                </button>
                                <button className='b2' onClick={callSignUp}>
                                    Signup
                                </button> 
                                {sign &&<h4 className='h'>SignUp successful!</h4>}
                                {sign &&<p>Click login to start Test</p>}
                                {mess && !sign&&<h4 className='H'>Incorrect Username or Password!</h4>}
                            </div>
                        </center>
                        <img className="i2" src="https://images.news18.com/ibnlive/uploads/2023/04/untitled-36.jpg" alt="img"/>
                    </div>
                </center>
            )}
        </div>
    );
}
