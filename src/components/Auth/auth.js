import React, { useState, useEffect } from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './auth.scss';

function Auth() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });
  const is4k = useMediaQuery({ query: '(min-device-width: 2560px)' })


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookies(['pg-token']);

  useEffect(() => {
    if (token['pg-token']) window.location.href = '/dashboard';
  }, [token]);

  const loginClicked = () => {
    API.loginUser({ email, password })
      .then((resp) => setToken('pg-token', resp.access))
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
      <span className={`flex-center title ${is4k ? 'mb-320': null}`}>Peer Group Portal</span>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={8} className={`img-col ${
                isTabletOrMobile || isTabletOrMobileDevice ? 'mb-32 flex-center' : null
              }`}>
            <Image
              className='auth-img'
              src={
                isTabletOrMobile || isTabletOrMobileDevice
                  ? '/assets/images/auth-img-mobile.svg'
                  : '/assets/images/auth-img.svg'
              }
              fluid
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={4}>
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
              <Button
                className={`login-btn pointer ${
                  isTabletOrMobile || isTabletOrMobileDevice ? 'mb-16' : 'mb-26'
                }`}
                onClick={loginClicked}
                disabled={isDisabled}
              >
                <span className='login-btn-text'>Login</span>
              </Button>
              <br />
              <Button
                variant='outline-primary'
                className='register-btn pointer'
                onClick={registerClicked}
                disabled={isDisabled}
              >
                <span className='register-btn-text'>Register</span>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Auth;
