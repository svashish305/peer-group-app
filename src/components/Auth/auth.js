import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './auth.scss';

function Auth() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1225px)',
  });
  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  return (
    <div className='main-container'>
      <span className='flex-center title'>Peer Group Portal</span>
      <Container>
        <Row
          className={
            isTabletOrMobile || isTabletOrMobileDevice ? null : 'd-flex'
          }
        >
          <Col>
            {isTabletOrMobile || isTabletOrMobileDevice ? (
              <Image
                className='logo'
                src='/assets/images/logomobile.svg'
                fluid
              />
            ) : (
              <Image className='logo' src='/assets/images/logo.svg' fluid />
            )}
          </Col>
          <Col>Login Form</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Auth;
