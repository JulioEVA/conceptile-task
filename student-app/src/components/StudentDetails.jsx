import PropTypes from 'prop-types';

StudentDetails.propTypes = {
  student: PropTypes.object.isRequired,
};

export function StudentDetails({ student }) {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl font-semibold text-center py-2'>
        Student details
      </h2>
      <div className='w-1/2 p-4 flex flex-col gap-2 justify-between'>
        <p className='bg-black rounded-md p-3'>
          <strong>Name:</strong> {student.name}
        </p>
        <p className='bg-black rounded-md p-3'>
          <strong>Age:</strong> {student.age}
        </p>
        <p className='bg-black rounded-md p-3'>
          <strong>Email:</strong> {student.email}
        </p>
        <p className='bg-black rounded-md p-3'>
          <strong>Phone:</strong> {student.phone}
        </p>
      </div>
    </div>
  );
}
