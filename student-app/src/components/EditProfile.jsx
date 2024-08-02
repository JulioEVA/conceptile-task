import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

EditProfile.propTypes = {
  student: PropTypes.object.isRequired,
  setStudent: PropTypes.func.isRequired,
  studentHistory: PropTypes.object.isRequired,
  setStudentHistory: PropTypes.func.isRequired,
  studentCourses: PropTypes.array.isRequired,
  setStudentCourses: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,
};

export function EditProfile({
  student,
  setStudent,
  studentHistory,
  setStudentHistory,
  studentCourses,
  setStudentCourses,
  loadProfile,
}) {
  //First form instance handles student history, second instance handles courses
  const { register, handleSubmit, reset } = useForm();
  const {
    register: registerCourse,
    handleSubmit: handleCourseSubmit,
    reset: resetCourseForm,
  } = useForm();
  const navigate = useNavigate();

  /**
   * Add a new student history record
   *
   * @param {*} param0.name The name of the institution
   * @param {*} param0.degree The degree earned
   * @param {*} param0.year The year of graduation
   */
  function addStudentHistory({ name, degree, year }) {
    setStudentHistory((prevStudentHistory) => ({
      ...prevStudentHistory,
      institutions: [
        ...prevStudentHistory.institutions,
        {
          name: name,
          degree: degree,
          year: year,
        },
      ],
    }));
    reset();
  }

  /**
   * Add a new course
   * @param {*} param0 The course details
   * @param {*} param0.name The name of the course
   * @param {*} param0.instructor The instructor of the course
   * @param {*} param0.duration The duration of the course
   */
  function addNewCourse({ name, instructor, duration }) {
    setStudentCourses((prevStudentCourses) => [
      ...prevStudentCourses,
      {
        name: name,
        instructor: instructor,
        duration: duration,
      },
    ]);
    resetCourseForm();
  }

  /**
   * Handle student details change
   * @param {*} e Event object
   */
  function onStudentChange(e) {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  }

  /**
   * Handle student history change
   * @param {*} e The event object
   * @param {*} index The index of the institution to change
   */
  function onStudentHistoryChange(e, index) {
    const { name, value } = e.target;
    setStudentHistory((prevStudentHistory) => ({
      ...prevStudentHistory,
      institutions: prevStudentHistory.institutions.map((institution, i) =>
        i === index ? { ...institution, [name]: value } : institution
      ),
    }));
  }

  /**
   * Handle student courses change
   * @param {*} e The event object
   * @param {*} index The index of the course to change
   */
  function onStudentCoursesChange(e, index) {
    const { name, value } = e.target;
    setStudentCourses((prevStudentCourses) =>
      prevStudentCourses.map((course, i) =>
        i === index ? { ...course, [name]: value } : course
      )
    );
  }

  /**
   * Saves the student's profile to local storage
   */
  function saveProfile() {
    localStorage.setItem('student', JSON.stringify(student));
    localStorage.setItem('studentHistory', JSON.stringify(studentHistory));
    localStorage.setItem('studentCourses', JSON.stringify(studentCourses));
    navigate('/');
  }

  /**
   * Delete a student history record
   * @param {*} index The index of the record to delete
   */
  function deleteStudentHistory(index) {
    setStudentHistory((prevStudentHistory) => ({
      ...prevStudentHistory,
      institutions: prevStudentHistory.institutions.filter(
        (institution, i) => i !== index
      ),
    }));
  }

  /**
   * Delete a course given its index
   * @param {*} index The index of the course to delete
   */
  function deleteCourse(index) {
    setStudentCourses((prevStudentCourses) =>
      prevStudentCourses.filter((course, i) => i !== index)
    );
  }

  /**
   * Load the student's profile from local storage on component mount
   */
  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <>
      <h1 className='text-center p-3 text-2xl'>Edit profile details</h1>
      <section>
        <div className='flex flex-col items-center'>
          <h2 className='text-xl font-semibold text-center'>Student details</h2>
          <div className='w-1/2 p-4 flex flex-col gap-2 justify-between'>
            <label className='font-bold' htmlFor='name'>
              Name
            </label>
            <input
              name='name'
              className='bg-black rounded-md p-3'
              defaultValue={student.name}
              onChange={onStudentChange}
            />
            <label className='font-bold' htmlFor='age'>
              Age
            </label>
            <input
              className='bg-black rounded-md p-3'
              defaultValue={student.age}
              name='age'
              onChange={onStudentChange}
            />
            <label className='font-bold' htmlFor='email'>
              Email
            </label>
            <input
              className='bg-black rounded-md p-3'
              defaultValue={student.email}
              name='email'
              onChange={onStudentChange}
            />
            <label className='font-bold' htmlFor='phone'>
              Phone
            </label>
            <input
              className='bg-black rounded-md p-3'
              defaultValue={student.phone}
              name='phone'
              onChange={onStudentChange}
            />
          </div>
        </div>
      </section>
      <section>
        <div className='flex flex-col items-center'>
          <h2 className='text-xl font-semibold text-center'>Student history</h2>
          <div className='w-1/2 p-4 flex flex-col gap-2 justify-between'>
            {studentHistory.institutions.length ? (
              studentHistory.institutions.map((institution, index) => (
                <div
                  key={index}
                  className='bg-black rounded-md p-3 flex gap-2 items-center max-md:flex-wrap'
                >
                  <label className='font-bold' htmlFor='name'>
                    Name:
                  </label>
                  <input
                    className='bg-black rounded-md  w-full'
                    defaultValue={institution.name}
                    name='name'
                    onChange={(e) => onStudentHistoryChange(e, index)}
                  />
                  <label className='font-bold' htmlFor='degree'>
                    Degree:
                  </label>
                  <input
                    className='bg-black rounded-md  w-full'
                    defaultValue={institution.degree}
                    name='degree'
                    onChange={(e) => onStudentHistoryChange(e, index)}
                  />
                  <label className='font-bold' htmlFor='year'>
                    Year:
                  </label>
                  <input
                    className='bg-black rounded-md  w-full'
                    defaultValue={institution.year}
                    name='year'
                    onChange={(e) => onStudentHistoryChange(e, index)}
                  />
                  <button
                    className='bg-red-500 p-2 text-white w-full rounded-md
             hover:bg-red-700 transition duration-500 ease-in-out font-bold'
                    onClick={() => deleteStudentHistory(index)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className='bg-black rounded-md p-3'>
                <strong>No institutions available</strong>
              </p>
            )}
            <h2 className='font-bold text-center'>
              Add a new student history record
            </h2>
            <form
              onSubmit={handleSubmit(addStudentHistory)}
              className='bg-black rounded-md p-3 flex gap-2 items-center max-md:flex-wrap'
            >
              <label className='font-bold' htmlFor='name'>
                Name:
              </label>
              <input
                className='bg-black rounded-md  w-full'
                placeholder='Enter the name'
                name='name'
                {...register('name', { required: true })}
              />
              <label className='font-bold' htmlFor='degree'>
                Degree:
              </label>
              <input
                className='bg-black rounded-md  w-full'
                placeholder='Enter degree earned'
                name='degree'
                {...register('degree', { required: true })}
              />
              <label className='font-bold' htmlFor='year'>
                Year:
              </label>
              <input
                className='bg-black rounded-md  w-full'
                placeholder='Enter year of graduation'
                name='year'
                {...register('year', { required: true })}
              />
              <button
                type='submit'
                className='bg-green-500 p-2 text-white w-full rounded-md
             hover:bg-green-700 transition duration-500 ease-in-out font-bold'
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <div className='flex flex-col items-center'>
          <h2 className='text-xl font-semibold text-center'>Courses</h2>
          <div className='w-1/2 p-4 flex flex-col'>
            {studentCourses.length ? (
              studentCourses.map((course, index) => (
                <div
                  key={index}
                  className=' bg-black rounded-md p-3 flex gap-2 items-center max-md:flex-wrap'
                >
                  <label htmlFor='name' className='font-bold'>
                    Course:
                  </label>
                  <input
                    className='bg-black w-full'
                    defaultValue={course.name}
                    name='name'
                    onChange={(e) => onStudentCoursesChange(e, index)}
                  />
                  <label htmlFor='instructor' className='font-bold'>
                    Instructor:
                  </label>
                  <input
                    className='bg-black w-full'
                    defaultValue={course.instructor}
                    name='instructor'
                    onChange={(e) => onStudentCoursesChange(e, index)}
                  />
                  <label htmlFor='duration' className='font-bold'>
                    Duration:
                  </label>
                  <input
                    className='bg-black w-full'
                    defaultValue={course.duration}
                    name='duration'
                    onChange={(e) => onStudentCoursesChange(e, index)}
                  />
                  <button
                    className='bg-red-500 p-2 text-white w-full rounded-md
             hover:bg-red-700 transition duration-500 ease-in-out font-bold'
                    onClick={() => deleteCourse(index)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className='bg-black rounded-md p-3'>
                <strong>No courses available</strong>
              </p>
            )}
            <h2 className='font-bold text-center'>Add a new course</h2>
            <form
              onSubmit={handleCourseSubmit(addNewCourse)}
              className='bg-black rounded-md p-3 flex gap-2 items-center max-md:flex-wrap'
            >
              <label className='font-bold' htmlFor='name'>
                Course:
              </label>
              <input
                className='bg-black rounded-md  w-full'
                placeholder='Enter the name'
                name='name'
                {...registerCourse('name', { required: true })}
              />
              <label className='font-bold' htmlFor='degree'>
                Instructor:
              </label>
              <input
                className='bg-black rounded-md  w-full'
                placeholder='Enter the instructor'
                name='instructor'
                {...registerCourse('instructor', { required: true })}
              />
              <label className='font-bold' htmlFor='year'>
                Duration:
              </label>
              <input
                className='bg-black rounded-md  w-full'
                placeholder='Enter the duration'
                name='duration'
                {...registerCourse('duration', { required: true })}
              />
              <button
                type='submit'
                className='bg-green-500 p-2 text-white w-full rounded-md
             hover:bg-green-700 transition duration-500 ease-in-out font-bold'
              >
                Add
              </button>
            </form>
          </div>
          <div className='w-1/2 flex justify-center gap-1'>
            <button
              type='button'
              onClick={saveProfile}
              className='bg-blue-500 p-2 text-white w-full rounded-md
              hover:bg-blue-700 transition duration-500 ease-in-out font-bold'
            >
              Save
            </button>
            <Link
              to='/'
              className='bg-red-500 p-2 text-white w-full rounded-md text-center
             hover:bg-red-700 transition duration-500 ease-in-out font-bold'
            >
              Cancel
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
