import React, { useState, useEffect } from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './auth.scss';

function Auth() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookies(['pg-token']);

  useEffect(() => {
    if (token['pg-token']) window.location.href = '/dashboard';
  }, [token]);

  const loginClicked = () => {
    API.loginUser({ email, password })
      .then((resp) => setToken('pg-token', resp.token))
      .catch((error) => console.log(error));
  };

  const registerClicked = () => {
    API.registerUser({ email, password })
      .then(() => loginClicked())
      .catch((error) => console.log(error));
  };

  const isDisabled = email.length === 0 || password.length === 0;

  return (
    <div className='main-container'>
      <span className='flex-center title'>Peer Group Portal</span>
      <Container>
        <Row className='custom-row'>
          <Col
            className={
              isTabletOrMobile || isTabletOrMobileDevice ? null : 'mt-66'
            }
          >
            <Image
              className='logo'
              src={
                isTabletOrMobile || isTabletOrMobileDevice
                  ? '/assets/images/logomobile.svg'
                  : '/assets/images/logo.svg'
              }
              fluid
            />
          </Col>
          <Col
            className={
              isTabletOrMobile || isTabletOrMobileDevice ? 'mt-34' : null
            }
          >
            <div
              className={`auth-container ${
                isTabletOrMobile || isTabletOrMobileDevice ? 'p-16' : 'p-26-24'
              }`}
            >
              <input
                id='emailId'
                className={`auth-input ${
                  isTabletOrMobile || isTabletOrMobileDevice ? 'mb-12' : 'mb-20'
                }`}
                type='email'
                placeholder='EmailID'
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
              <br />
              <input
                id='password'
                className={`auth-input ${
                  isTabletOrMobile || isTabletOrMobileDevice ? 'mb-32' : 'mb-20'
                }`}
                type='password'
                placeholder='Password'
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
              />
              <br />
              <button
                className={`login-btn pointer ${
                  isTabletOrMobile || isTabletOrMobileDevice ? 'mb-16' : 'mb-26'
                }`}
                onClick={loginClicked}
                disabled={isDisabled}
              >
                <span className='login-btn-text'>Login</span>
              </button>
              <br />
              <button
                className='register-btn pointer'
                onClick={registerClicked}
                disabled={isDisabled}
              >
                <span className='register-btn-text'>Register</span>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Auth;
