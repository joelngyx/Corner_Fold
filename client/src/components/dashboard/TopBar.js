import React, { useState, useEffect } from 'react';
import Logo from '../../assets/Logo.svg';
// eslint-disable-next-line
import SettingsDefault from '../../assets/SettingsDefault.svg';
// eslint-disable-next-line
import SettingsHover from '../../assets/SettingsHover.svg';
import SettingsSelected from '../../assets/SettingsSelected.svg';

const TopBar = (props) => {
  const [showSettings, setShowSettings] = useState(false);

  const handleShowSettings = () => {
    setShowSettings(!showSettings);
  }

  return (
    <div>
      <div className='bar'>
        <img src={Logo} />
        <h2>CornerFold</h2> 
        <div className='settings-btn' 
          onClick={handleShowSettings}>
          <img src={(showSettings == true) ? SettingsDefault : SettingsSelected}></img>
        </div>
      </div>
      {(showSettings == true) ? <></> : 
        <div className='settings-options'>
          <button>Search for Bookmark</button>
          <button>Set Theme</button>
          <button>Change Personal Information</button>
          <button onClick={props.logout}>Logout</button>
        </div>}
    </div>
  )
}

export default TopBar;