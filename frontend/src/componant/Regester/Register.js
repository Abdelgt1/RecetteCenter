import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameFocus = () => {
    setUsernameFocused(true);
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handleUsernameBlur = () => {
    setUsernameFocused(false);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const handleRegister = () => {
    const formData = {
      username,
      email,
      password,
    };

    fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        navigate('/auth');
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Registration failed. Please try again.');
      });
  };


  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol md='6' className='d-flex align-items-center justify-content-center'>
          <div className='text-center'>
            <h1 className='mb-4'><a href="/">RecetteCenter</a></h1>
            <h2 className='mb-4'>Register</h2> 

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

            <div className={`mb-4 form-floating ${emailFocused ? 'focused' : ''}`}>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='Email'
                value={email}
                onChange={handleEmailChange}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
              />
              <label htmlFor='email'>Email</label>
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

            <div className='text-center text-md-start'>
              <MDBBtn className='mb-0 px-5' size='lg' onClick={handleRegister}>
                Register 
              </MDBBtn>

              <p className='small fw-bold mt-2 pt-1 mb-2'>
                Already have an account? <a href={`/auth`} className="link-danger">Login</a>
              </p>
            </div>
          </div>
        </MDBCol>

        <MDBCol md='6'>
          <img
            src="https://img.freepik.com/vecteurs-libre/illustration-concept-aliments-sains_114360-11817.jpg?w=740&t=st=1701785049~exp=1701785649~hmac=9356f673360f60592c60766ed7b42df8ea6eee0c92d7b0d3496704634b17131d"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;