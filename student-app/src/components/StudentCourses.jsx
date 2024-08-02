export function StudentCourses({ studentCourses }) {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl font-semibold text-center'>Courses</h2>
      <div className='w-1/2 p-4 flex flex-col gap-2 justify-between'>
        {studentCourses.length ? (
          studentCourses.map((course, index) => (
            <div
              key={index}
              className='bg-black rounded-md p-3 flex flex-wrap justify-evenly'
            >
              <strong>Course:</strong> {course.name}
              <strong>Instructor:</strong> {course.instructor}
              <strong>Duration:</strong> {course.duration}
            </div>
          ))
        ) : (
          <p className='bg-black rounded-md p-3'>
            <strong>No courses available</strong>
          </p>
        )}
      </div>
    </div>
  );
}
