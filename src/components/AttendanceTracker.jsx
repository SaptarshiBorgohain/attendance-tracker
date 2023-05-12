import { useState } from 'react';
import { supabase } from '../supabase/client';
import './AttendanceTracker.css'

const AttendanceTracker = () => {

  const [subjects, setSubjects] = useState([
    { name: 'Math', attendedClasses: 0, totalClasses: 0 },
    { name: 'English', attendedClasses: 0, totalClasses: 0 },
    { name: 'Science', attendedClasses: 0, totalClasses: 0 },
    { name: 'History', attendedClasses: 0, totalClasses: 0 },
  ]);

// Delete Subjects
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

// Handle attendance
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

  // Add subjects
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
        <div className="attendance-cards">
          {subjects.map((subject, index) => {
            const attendancePercentage = ((subject.attendedClasses / subject.totalClasses) * 100).toFixed(2);
            const classesToAttend = Math.ceil((0.75 * subject.totalClasses - subject.attendedClasses) / 0.25);
            return (
              <div key={index} className="attendance-card">
                <div className="card-content">
                  <h3>{subject.name}</h3>
                  <div className="attendance-details">
                    <div>
                      <span>Attended:</span>
                      <span>{subject.attendedClasses}</span>
                    </div>
                    <div>
                      <span>Total:</span>
                      <span>{subject.totalClasses}</span>
                    </div>
                    <div className="ring">
                      <div className="progress"></div>
                        <div className="text">
                          <span>Attendance %:</span>
                          <span>{attendancePercentage}%</span>
                        </div>
                    </div>
                    <div>
                      <span>Classes to Attend:</span>
                      <span>{attendancePercentage < 75 ? classesToAttend : '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="card-actions">
                  <button onClick={() => handleClassAttendance(index, true)}>Attended</button>
                  <button onClick={() => handleClassAttendance(index, false)}>Missed</button>
                  <button onClick={() => handleDeleteSubject(index)}>Delete</button>
                </div>
              </div>
            );
          })}
          <div className="attendance-card add-subject-card">
            <div className="card-content">
              <input type="text" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} />
            </div>
            <div className="card-actions">
              <button onClick={handleAddSubject}>Add Subject</button>
            </div>
          </div>
        </div>
    </div>

    );
};


export default AttendanceTracker;
