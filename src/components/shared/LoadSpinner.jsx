import Spinner from 'react-bootstrap/Spinner';

function LoadSpinner() {
  return (
    <Spinner animation="border" role="status" variant="secondary" 
        style={{width: 100, height: 100}} className='position-absolute top-50 start-50'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default LoadSpinner;