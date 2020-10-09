import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Sidebar from './components/sidebar/sidebar';
import Dashboard from './components/dashboard';
import './App.scss';
import {Image} from 'react-bootstrap';

function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1225px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  return (
    <div className="App">
      {/* <h1>Device Test!</h1>
      {isDesktopOrLaptop && <>
        <p>You are a desktop or laptop</p>
        {isBigScreen && <p>You also have a huge screen</p>}
        {isTabletOrMobile && <p>You are sized like a tablet or mobile phone though</p>}
      </>}
      {isTabletOrMobileDevice && <p>You are a tablet or mobile phone</p>}
      <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
      {isRetina && <p>You are retina</p>} */}

      {/* <header className="App-header">
        Peer Group App
      </header>
      <Sidebar />
      <Dashboard /> */}
      <span className='flex-center title'>Peer Group Portal</span>
      {(isTabletOrMobile || isTabletOrMobileDevice) && <Image src='/assets/images/logomobile.svg' fluid />}
      {(isBigScreen || isDesktopOrLaptop) && <Image src='/assets/images/logo.svg' fluid />}
    </div>
  );
}

export default App;
