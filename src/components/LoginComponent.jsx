import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

const LoginComponent = () => {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length === 0) {
      // Only redirect if no active account is found
      instance.loginRedirect();
    }
  }, [instance, accounts]);

  return "Authenticating...."; // Optional: You can display a loading spinner or message
};

export default LoginComponent;
