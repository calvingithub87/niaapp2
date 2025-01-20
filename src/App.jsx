import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './fonts/nia-fonts.css';
import './App.css';
import HeaderComponent from './components/HeaderComponent'
import PageContentComponent from './components/PageContentComponent'
import LoginComponent from './components/LoginComponent'
import { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

function App() {
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const toggleLeftPanel = (toggle) =>{
    setShowLeftPanel(toggle);
  }
  return (
    <>
    <div className='main'>
      <AuthenticatedTemplate>
        <HeaderComponent toggleLeftPanel={toggleLeftPanel} showLeftPanel={showLeftPanel} />
        <PageContentComponent showLeftPanel={showLeftPanel} />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
          <LoginComponent />
      </UnauthenticatedTemplate>
    </div>
    </>
  )
}

export default App
