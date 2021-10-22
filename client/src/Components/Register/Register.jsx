import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Contexts/userContext';
import axios from 'axios';

const Register = ({ location, history }) => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({});

  const contextValue = useContext(UserContext);
  console.log(contextValue.user);

  // Change visibility of password
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user.userInfo) {
      history.push('/');
    }
  }, [user, history]);

  // Post register info to server
  useEffect(() => {
    async function fetchData() {
      if (registerInfo.name && registerInfo.email && registerInfo.password) {
        const { name, email, password } = registerInfo;
        try {
          const url = 'http://localhost:5000/api/users/';
          const res = await axios.post(url, {
            name: name,
            email: email,
            password: password,
          });
          if (res.data) {
            const userInfo = {
              isLoggedIn: true,
              name: res.data.name,
              email: res.data.email,
              id: res.data._id,
              token: res.data.token,
            };
            setUser({
              userInfo,
            });
            //Save user to localStorage
            localStorage.setItem('user', JSON.stringify(userInfo));
            setRegisterInfo({});
          } else {
            setRegisterInfo({});
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    }
    fetchData();
  }, [registerInfo, setUser]);

  // Button click handler
  const handleGoHome = () => {
    history.push('/');
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const userData = {
          name,
          email,
          password,
        };
        setRegisterInfo(userData);
      } else {
        alert('Passwords do not match');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className='register'>
      <button onClick={handleGoHome}>X</button>
      <h2>Create Account</h2>
      <p>or with your mail</p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          required
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          required
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={passwordShown ? 'text' : 'password'}
          required
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{' '}
        <i className='fas fa-eye-slash' onClick={togglePassword}></i>
        <input
          type={confirmPasswordShown ? 'text' : 'password'}
          required
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />{' '}
        <i className='fas fa-eye-slash' onClick={toggleConfirmPassword}></i>
        <input type='checkbox' required /> By signing up, you agree to our{' '}
        <Link to='/'>Terms</Link> and that you have read our{' '}
        <Link to='/'>Privacy Policy</Link>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
