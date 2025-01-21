import axios from "axios";
import { useMsal } from "@azure/msal-react";

const BASE_URL = "http://localhost:8000/"; // Update this to your actual API base URL

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Enables cookies for all requests

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const refreshToken = async (msalInstance, account) => {
  try {
    // Use MSAL to acquire a new token silently
    const tokenResponse = await msalInstance.acquireTokenSilent({
      scopes: ["api://53ddbbab-4e8b-4327-98d1-35c42d3329b3/access_as_user"], // Replace with your actual scope
      account,
    });

    const newToken = tokenResponse.accessToken;
    sessionStorage.setItem("auth_token", newToken); // Store in sessionStorage
    console.log("refreshToken authToken:" + newToken);
    return newToken;
  } catch (err) {
    console.error("Token refresh failed", err);
    throw err; // Redirect to login in case of error
  }
};

// Axios request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  console.log("request interceptor called");

  // First, check for the token in sessionStorage
  let token = sessionStorage.getItem("auth_token");

  // If the token is not found, attempt to acquire it using MSAL
  if (!token) {
    if (accounts.length === 0) {
      console.error("No active account found for acquiring token");
    } else {
      try {
        const tokenResponse = await instance.acquireTokenSilent({
          scopes: ["api://53ddbbab-4e8b-4327-98d1-35c42d3329b3/access_as_user"], // Use your Azure AD scope
          account: accounts[0], // Use the first account
        });
        token = tokenResponse.accessToken;
        // Save the token to sessionStorage for future requests
        sessionStorage.setItem("auth_token", token);
        console.log("Token fetched using MSAL and saved:", token);
      } catch (error) {
        console.error("Error acquiring token using MSAL:", error);
      }
    }
  }

  // If the token is found (or acquired), attach it to the request
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.error("No token found, unable to proceed with the request.");
  }

  return config;
});


// Axios response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    console.log("response interceptor called");
    if (
      response &&
      response.status === 401 &&
      response.data.includes("Expired token")
    ) {
      try {
        const { instance, accounts } = useMsal();
        const account = accounts[0]; // Get the first account

        if (!account) {
          throw new Error("No account found for token refresh");
        }

        const newToken = await refreshToken(instance, account);

        // Update headers with the new token
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(error.config); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        window.location.href = "/login"; // Redirect to login if refresh fails
      }
    }

    return Promise.reject(error);
  }
);

const formHeader = () => {
  const auth_token = sessionStorage.getItem("auth_token");
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${auth_token}`,
    },
  };
};

const jsonHeader = () => {
  const auth_token = sessionStorage.getItem("auth_token");
  console.log("Auth Token: " + auth_token);
  return {
    headers: {  
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
  };
};

const chatServices = {
  async getGpts() {
    return await axiosInstance.get(`get_gpts`, jsonHeader());
  },

  async getUsecase(gpt_id) {
    console.log("gpt_id", gpt_id);
    return await axiosInstance.get(`usecases/${gpt_id}`, jsonHeader());
  },

  async postChat(formData, gpt_id, gpt_name) {
    gpt_id = "6788af65a27d09ae127f3cea";
    gpt_name = "Nia";
    return await axiosInstance.post(
      `chat/${gpt_id}/${gpt_name}`,
      formData,
      formHeader()
    );
  },

  async chatHistory(gpt_id, gpt_name) {
    gpt_id = "6788af65a27d09ae127f3cea";
    gpt_name = "Nia";
    return await axiosInstance.get(
      `chat_history/${gpt_id}/${gpt_name}`,
      jsonHeader()
    );
  },

  async clearChathistory(gpt_id, gpt_name) {
    gpt_id = "6788af65a27d09ae127f3cea";
    gpt_name = "Nia";
    return await axiosInstance.put(
      `clear_chat_history/${gpt_id}/${gpt_name}`,
      jsonHeader()
    );
  },

  async updateInstruction(gpt_id, gpt_name, usecase_id) {
    return await axiosInstance.post(
      `update_instruction/${gpt_id}/${gpt_name}/${usecase_id}`,
      jsonHeader()
    );
  },
};

export { BASE_URL, chatServices, refreshToken, axiosInstance };
