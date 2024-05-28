import React, { useState, useEffect } from 'react';

function Display() {
    const [students, setStudents] = useState([]);
    // const [rank,setRank]=useState(0);
    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = async () => {
        try {
            const response = await fetch('http://localhost:5000/students');
            const data = await response.json();
            if (Array.isArray(data)) {
                setStudents(data);
            } else {
                console.error('Invalid student data:', data);
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    return (
        <div>
            <h1>Student Data</h1>
            <table border='1'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student.username}</td>
                            <td>6</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Display;
