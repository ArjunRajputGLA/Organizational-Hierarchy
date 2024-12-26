import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {
  const [status, setStatus] = useState('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:3001/verify-email/${token}`);
        setStatus('success');
      } catch (error) {
        console.error('Verification error:', error);
        // Check if user is already verified
        if (error.response?.status === 404) {
          // Try to check if user is already verified
          try {
            const checkResponse = await axios.get(`http://localhost:3001/check-verification/${token}`);
            if (checkResponse.data.isVerified) {
              setStatus('success');
              return;
            }
          } catch {
            // If check fails, show original error
            setStatus('error');
            setErrorMessage('Invalid verification token or link expired');
          }
        } else {
          setStatus('error');
          setErrorMessage(error.response?.data?.message || 'Verification failed');
        }
      }
    };
    verifyEmail();
  }, [token]);

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    },
    card: {
      width: '90%',
      maxWidth: '400px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      textAlign: 'center'
    },
    errorCard: {
      backgroundColor: '#fff1f1',
      width: '90%',
      maxWidth: '400px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      textAlign: 'center'
    },
    heading: {
      color: '#dc3545',
      fontSize: '24px',
      marginBottom: '16px',
      fontWeight: '600'
    },
    text: {
      color: '#666',
      fontSize: '16px',
      marginBottom: '24px',
      lineHeight: '1.5'
    },
    errorText: {
      color: '#dc3545',
      fontSize: '16px',
      marginBottom: '24px',
      lineHeight: '1.5'
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center'
    },
    closeButton: {
      padding: '10px 24px',
      border: '2px solid #dc3545',
      borderRadius: '5px',
      backgroundColor: 'transparent',
      color: '#dc3545',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    registerButton: {
      padding: '10px 24px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#dc3545',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    spinner: {
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #dc3545',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 20px auto'
    }
  };

  return (
    <div style={styles.container}>
      {status === 'verifying' && (
        <div style={styles.card}>
          <div style={styles.spinner}></div>
          <h2 style={styles.heading}>Verifying Email</h2>
          <p style={styles.text}>Please wait while we verify your email address...</p>
        </div>
      )}

      {status === 'success' && (
        <div style={styles.card}>
          <h2 style={{...styles.heading, color: '#28a745'}}>Email Verified!</h2>
          <p style={styles.text}>Your email has been successfully verified.</p>
          <p style={styles.text}>You can now close this page and proceed to login.</p>
          <button 
            style={{...styles.closeButton, borderColor: '#28a745', color: '#28a745'}}
            onClick={() => window.close()}
          >
            Close Window
          </button>
        </div>
      )}

      {status === 'error' && (
        <div style={styles.errorCard}>
          <h2 style={styles.heading}>Verification Failed</h2>
          <p style={styles.errorText}>{errorMessage}</p>
          <p style={styles.errorText}>You can now close this page.</p>
          <div style={styles.buttonContainer}>
            <button 
              style={styles.closeButton}
              onClick={() => window.close()}
            >
              Close Window
            </button>
            <button 
              style={styles.registerButton}
              onClick={() => navigate('/register')}
            >
              Register Again
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default VerifyEmail;