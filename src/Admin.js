import { useState } from 'react';
import './App.css';
import Display from './Display';

export default function Admin() {
    const [display, setDisplay] = useState(false);

    const callLogin = () => {
        var userName = document.getElementById('username').value;
        var Password = document.getElementById('password').value;
        fetch('http://localhost:5000/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: userName, password: Password }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); // Log the object
            let result = userName.localeCompare(data.message); // Compare userName with message property
            console.log(result); // Log the result
            if (result === 0) {
                // console.log('hi');
                setDisplay(true); // Set state to true to show QuestionPage
            }
            else {
                         alert('Incorrect username or password');
                     }
        })
        // .then(data => {
        //     if (data.message === 'Login successful') {
        //         setDisplay(true);
        //     } 
        // })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            {display ? (
                <Display />
            ) : (
                <center>
                    <div className='d1'>
                        <center>
                            <div className='d2'>
                                <label>
                                    <input className='in1' type="text" id='username' placeholder='username'/>
                                </label>
                                <br></br>
                                <br></br>
                                <label>
                                    <input className='in1' type="password" id='password' placeholder='password'/>
                                </label>
                                <br></br>
                                <br></br>
                                <button className="b1" onClick={callLogin}>
                                    Login
                                </button>
                            </div>
                        </center>
                        <img className="i1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzdpTxarDG5-V1kXvPC7WpX5pkIzNzeZcGtA&s" alt="img"/>
                    </div>
                </center>
            )}
        </div>
    );
}
