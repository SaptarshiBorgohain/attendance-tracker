import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';



const supabaseUrl = 'https://kavgwiqflkublvvyffiz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthdmd3aXFmbGt1Ymx2dnlmZml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4Mzk1MjcsImV4cCI6MTk5ODQxNTUyN30.UmzSMsOBDLzfgI7qwFyzQnj9MRxHwfy6GjtF5gEWeo8';
const supabase = createClient(supabaseUrl, supabaseKey);

const AttendanceTracker = () => {
  const [subjects, setSubjects] = useState([
    { name: 'Math', attendedClasses: 0, totalClasses: 0 },
    { name: 'English', attendedClasses: 0, totalClasses: 0 },
    { name: 'Science', attendedClasses: 0, totalClasses: 0 },
    { name: 'History', attendedClasses: 0, totalClasses: 0 },
  ]);


  const handleDeleteSubject = async (index) => {
    const subject = subjects[index];
    const { data, error } = await supabase.from('attendance').delete().eq('subject', subject.name);

    if (error) {
      console.log('Error deleting subject:', error.message);
    } else {
      console.log('Subject deleted successfully:', data);
      const updatedSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(updatedSubjects);
    }
  };

  const handleClassAttendance = async (index, isAttended) => {
    const subject = subjects[index];

    const { data, error } = await supabase
      .from('attendance')
      .update({
        attended_classes: isAttended ? subject.attendedClasses + 1 : subject.attendedClasses,
        total_classes: subject.totalClasses + 1,
      })
      .eq('subject', subject.name);

    if (error) {
      console.log('Error updating attendance:', error.message);
    } else {
      console.log('Attendance updated successfully:', data);
      const updatedSubjects = [...subjects];
      updatedSubjects[index].attendedClasses = isAttended ? subject.attendedClasses + 1 : subject.attendedClasses;
      updatedSubjects[index].totalClasses += 1;
      setSubjects(updatedSubjects);
    }
  };

  const [newSubject, setNewSubject] = useState('');

  const handleAddSubject = () => {
    const updatedSubjects = [...subjects];
    updatedSubjects.push({ name: newSubject, attendedClasses: 0, totalClasses: 0 });
    setSubjects(updatedSubjects);
    setNewSubject('');
  }
  return (
      <div>
        <h2>My Attendance Tracker</h2>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Attended</th>
              <th>Total</th>
              <th>Attendance %</th>
              <th>Classes to Attend</th>
              <th>Mark Attendance</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => {
              const attendancePercentage = ((subject.attendedClasses / subject.totalClasses) * 100).toFixed(2);
              const classesToAttend = Math.ceil((0.75 * subject.totalClasses - subject.attendedClasses) / 0.25);
              return (
                <tr key={index}>
                  <td>{subject.name}</td>
                  <td>{subject.attendedClasses}</td>
                  <td>{subject.totalClasses}</td>
                  <td>{attendancePercentage}%</td>
                  <td>{attendancePercentage < 75 ? classesToAttend : '-'}</td>
                  <td>
                    <button onClick={() => handleClassAttendance(index, true)}>Attended</button>
                    <button onClick={() => handleClassAttendance(index, false)}>Missed</button>
                    
                  </td>
                  <td>
                  <button onClick={() => handleDeleteSubject(index)}>Delete</button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <input type="text" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} />
              </td>
              <td colSpan="5"></td>
              <td>
                <button onClick={handleAddSubject}>Add Subject</button>
              </td>
            </tr>
          </tbody>
        </table> 
      </div>
    );
};



  

export default AttendanceTracker;