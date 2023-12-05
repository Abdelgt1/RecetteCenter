import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameFocus = () => {
    setUsernameFocused(true);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handleUsernameBlur = () => {
    setUsernameFocused(false);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
  
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const data = await response.json();
        setError(data.detail);
        return;
      }
  
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      navigate('/'); 
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol md='6' className='d-flex align-items-center justify-content-center'>
          <div className='text-center'>
          <h1 className='mb-4'><a href="/">RecetteCenter</a></h1>
            <h1 className='mb-4'>Log in</h1>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className={`mb-4 form-floating ${usernameFocused ? 'focused' : ''}`}>
              <input
                type='text'
                className='form-control'
                id='username'
                placeholder='Username'
                value={username}
                onChange={handleUsernameChange}
                onFocus={handleUsernameFocus}
                onBlur={handleUsernameBlur}
              />
              <label htmlFor='username'>Username</label>
            </div>

            <div className={`mb-4 form-floating ${passwordFocused ? 'focused' : ''}`}>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Password'
                value={password}
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
              <label htmlFor='password'>Password</label>
            </div>

            <div className='d-flex justify-content-between mb-4'>
              <a href="!#">Forgot password?</a>
            </div>

            <div className='text-center text-md-start'>
            <MDBBtn className='mb-0 px-5' size='lg' onClick={handleLogin}>
            Login
            </MDBBtn>

              <p className='small fw-bold mt-2 pt-1 mb-2'>
                Don't have an account? <a href={`/registre`} className="link-danger">Register</a>
              </p>
            </div>
          </div>
        </MDBCol>

        <MDBCol md='6'>
          <img
            src="https://img.freepik.com/vecteurs-libre/illustration-concept-plaque-saine-alimentation_114360-13382.jpg?w=740&t=st=1701781727~exp=1701782327~hmac=41c009380791a014e25a20b1edceb5047afd85bfbcdc5317b9a8fad7b15f67e9"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Auth;
