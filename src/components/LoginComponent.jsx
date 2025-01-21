import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

const LoginComponent = () => {
  const [loading, setLoading] = useState(true); // State to show loading UI
  const [error, setError] = useState(null); // State to capture any errors
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        console.log("accounts.length :" + accounts.length);
        if (accounts.length === 0) {
          // No active account, trigger login redirect
          await instance.loginRedirect();
        } else {
          // Silent token acquisition for logged-in user
          const tokenResponse = await instance.acquireTokenSilent({
            scopes: ["api://53ddbbab-4e8b-4327-98d1-35c42d3329b3/access_as_user"], // Replace with your Azure AD scope
            account: accounts[0],
          });
          console.log("Token saved to sessionStorage:", tokenResponse.accessToken); // Save token for API calls
          sessionStorage.setItem("auth_token", tokenResponse.accessToken); // Save token
        }
      } catch (err) {
        console.error("Login or Token Acquisition Error:", err);
        setError(err.message); // Capture and display the error
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    checkLogin();
  }, [instance, accounts]);

  if (loading) {
    return <div>Authenticating...</div>; // Optional spinner or loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div>
      <p>Welcome, {accounts[0]?.username || "User"}!</p>
    </div>
  );
};

export default LoginComponent;
