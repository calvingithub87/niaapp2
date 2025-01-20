import React from 'react';
import BOSCH_Logo from '/images/bosch-logo.svg';
import Profile_Icon from '/images/my-brand-frame.svg';
import ToggleLeft from '/images/list-view-mobile.svg';
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

const HeaderComponent = (props) => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const togglePanel = () =>{
    props.toggleLeftPanel(!props.showLeftPanel);
  }

  const handleLogout = () => {
    instance.logoutRedirect(); // Redirects to the logout page and clears session
  };

  return (
    <div className='nia-header'>
        <div className='nia-header-container'>
            <div className='nia-brand-name'>
                <img src={ToggleLeft} alt={''} className='nia-toggleSliderbtn' onClick={togglePanel} />
                <img src={BOSCH_Logo} alt='BOSCH' />
                <span className='nia-brand-separator'> </span>
                <span><span className='nia-color-BA04AE'>N</span><span className='nia-color-EB0100'>I</span><span className='nia-color-BA04AE'>A</span></span>
            </div>
            <div className='nia-brand-title'><span>NextGen Intelligent Assistant</span></div>
            <div className='nia-profile'>
                {isAuthenticated ? (
                <>
                  <span className="nia-welcome-text">
                    Welcome! {accounts[0]?.name || "User"}!
                  </span>
                  <span className="nia-separator"></span>
                  {/* <img src={Profile_Icon} alt={'Profile'} /> */}
                  <span className="nia-logout" onClick={handleLogout}>
                    Logout
                  </span>
                </>
              ) : (
                <span className="nia-welcome-text">Welcome! Guest!</span>
              )}
            </div>
        </div>
        
    </div>
  )
}

export default HeaderComponent