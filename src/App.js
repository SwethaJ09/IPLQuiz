import Student from './Student';
import Admin from './Admin';
import { useState } from 'react';

export default function App() {
  <h1> IPL Quiz!</h1>
  const [showStudent, setShowStudent] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const showStudentComponent = () => {
    setShowStudent(true);
    setShowAdmin(false);
  };

  const showAdminComponent = () => {
    setShowStudent(false);
    setShowAdmin(true);
  };

  return (
        <center>
          <div className='d3'> 
            {!showAdmin && !showStudent &&(
              <div className='d4'>
                <h1>IPL Quiz !</h1>
                <h1>Who Are You ?</h1>
                <button className="b1" onClick={showStudentComponent}>STUDENT</button>
                
                <button className="b1" onClick={showAdminComponent}>ADMIN</button>
              </div>
            )}
            {showStudent && <Student/>}
            {showAdmin && <Admin/>}
          </div>
      </center>  
  );
}