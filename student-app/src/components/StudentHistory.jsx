import PropTypes from 'prop-types';

StudentHistory.propTypes = {
  studentHistory: PropTypes.object.isRequired,
};

export function StudentHistory({ studentHistory }) {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl font-semibold text-center'>Student history</h2>
      <div className='w-1/2 p-4 flex flex-col gap-2 justify-between'>
        {studentHistory.institutions.length ? (
          studentHistory.institutions.map((institution, index) => (
            <div
              key={index}
              className='bg-black rounded-md p-3 flex justify-evenly flex-wrap'
            >
              <strong>Institution:</strong> {institution.name}
              <strong>Degree:</strong> {institution.degree}
              <strong>Year:</strong> {institution.year}
            </div>
          ))
        ) : (
          <p className='bg-black rounded-md p-3'>
            <strong>No institutions available</strong>
          </p>
        )}
      </div>
    </div>
  );
}
