import Alert from 'react-bootstrap/Alert';

function MessageAlert({variant, message}) {
  return (
    <>
        <Alert key={variant} variant={variant} className='text-center'>
          {message}
        </Alert>
    </>
  );
}

export default MessageAlert;
