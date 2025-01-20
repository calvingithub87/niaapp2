import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import store from "./store";
import App from './App.jsx'
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

// const client_id = `${import.meta.env.CLIENT_ID}`;
// const authority = `${import.meta.env.AUTHORITY_URL}`+"/"+`${import.meta.env.TENANT_ID}`;
// const redirect_uri = `${import.meta.env.REDIRECT_URI}`;

// const msalConfiguration_local = {
//   auth: {
//       clientId : "53ddbbab-4e8b-4327-98d1-35c42d3329b3",
//       authority: "https://login.microsoftonline.com/6e50f04c-22d7-4b8e-8fa2-08f577dfa5aa", // Replace with your Azure AD tenant ID
//       // the only mandatory field in this object, uniquely identifies your app
//       // here you'll add the other fields that you might need based on the Azure portal settings
//       redirectUri: "http://localhost:5173" // Register as a SPA. This must match the redirect uri in Azure App Registration
//   }
// };

const msalConfiguration_azure = {
  auth: {
      clientId : "5803bd0c-30b8-4f38-9327-ac6642e75245",
      authority: "https://login.microsoftonline.com/6e50f04c-22d7-4b8e-8fa2-08f577dfa5aa", // Replace with your Azure AD tenant ID
      // the only mandatory field in this object, uniquely identifies your app
      // here you'll add the other fields that you might need based on the Azure portal settings
      redirectUri: "https://niaapp2.azurewebsites.net" // Register as a SPA. This must match the redirect uri in Azure App Registration
  }
};

//https://niaapp-eaakgacxa4hsa3b4.australiaeast-01.azurewebsites.net/.auth/login/aad/callback

const pca = new PublicClientApplication(msalConfiguration_azure);
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <MsalProvider instance={pca}>
        <App />
      </MsalProvider>
    </Provider>
  
)
