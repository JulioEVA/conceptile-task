import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { EditProfile } from './components/EditProfile';
import { StudentCourses } from './components/StudentCourses';
import { StudentHistory } from './components/StudentHistory';
import { StudentDetails } from './components/StudentDetails';

export default function App() {
  const [student, setStudent] = useState({
    name: 'John Doe',
    age: 20,
    email: 'john@doe.com',
    phone: '1234567890',
  });
  const [studentHistory, setStudentHistory] = useState({
    institutions: [
      { name: 'Yale', degree: 'Bachelors', year: 2020 },
      { name: 'Harvard', degree: 'Masters', year: 2022 },
    ],
  });
  const [studentCourses, setStudentCourses] = useState([
    { name: 'Math', instructor: 'John Snow', duration: '3 months' },
  ]);

  /**
   * Load the student's profile from local storage on component mount
   */
  function loadProfile() {
    const student = localStorage.getItem('student');
    const studentHistory = localStorage.getItem('studentHistory');
    const studentCourses = localStorage.getItem('studentCourses');

    if (student) {
      setStudent(JSON.parse(student));
    }
    if (studentHistory) {
      setStudentHistory(JSON.parse(studentHistory));
    }
    if (studentCourses) {
      setStudentCourses(JSON.parse(studentCourses));
    }
  }

  /**
   * Retrieve the student's profile from local storage
   */
  useEffect(() => {
    loadProfile();
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <StudentDetails student={student} />
              <StudentHistory studentHistory={studentHistory} />
              <StudentCourses studentCourses={studentCourses} />
              <Link
                to='/edit'
                className='text-center font-bold bg-blue-600 flex w-1/2 justify-center p-2 text-white rounded-md self-center'
              >
                Edit profile
              </Link>
            </>
          }
        />
        <Route
          path='/edit'
          element={
            <EditProfile
              student={student}
              setStudent={setStudent}
              studentHistory={studentHistory}
              setStudentHistory={setStudentHistory}
              studentCourses={studentCourses}
              setStudentCourses={setStudentCourses}
              loadProfile={loadProfile}
            />
          }
        />
      </Routes>
    </Router>
  );
}
