import axios from "axios";
import { useMsal } from "@azure/msal-react";

//const BASE_URL = "http://localhost:8000/"; // Update this to your actual API base URL
const BASE_URL = "https://customgptapp.azurewebsites.net/"
const client_id = "5803bd0c-30b8-4f38-9327-ac6642e75245";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Enables cookies for all requests

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const refreshToken = async (msalInstance, account) => {
  try {
    // Use MSAL to acquire a new token silently
    const tokenResponse = await msalInstance.acquireTokenSilent({
      scopes: ["api://"+client_id+"/access_as_user"], // Replace with your actual scope
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
  const token = sessionStorage.getItem("auth_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.error("No token found in sessionStorage" + JSON.stringify(sessionStorage));
  }
  return config;
});


// Axios response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { response } = error;
//     console.log("response interceptor called");
//     if (
//       response &&
//       response.status === 401 &&
//       response.data.includes("Expired token")
//     ) {
//       try {
//         const { instance, accounts } = useMsal();
//         const account = accounts[0]; // Get the first account

//         if (!account) {
//           throw new Error("No account found for token refresh");
//         }

//         const newToken = await refreshToken(instance, account);

//         // Update headers with the new token
//         error.config.headers["Authorization"] = `Bearer ${newToken}`;
//         return axiosInstance(error.config); // Retry the original request
//       } catch (refreshError) {
//         console.error("Token refresh failed", refreshError);
//         window.location.href = "/login"; // Redirect to login if refresh fails
//       }
//     }

//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const { response } = error;
    if (response && response.status === 401 && response.data.includes('Expired token')) {
      try {
        const tokenResponse = await refreshToken();
        const newToken = tokenResponse.data; 
        localStorage.setItem('auth_token', newToken);
        axiosInstance.defaults.headers['auth_token'] = newToken;
        error.config.headers['auth_token'] = newToken;
        return axiosInstance(error.config);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        window.location.href = '/login';
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
    gpt_id = "6787c2f96368ac3ad473ad4e";
    gpt_name = "Nia";
    return await axiosInstance.post(
      `chat/${gpt_id}/${gpt_name}`,
      formData,
      formHeader()
    );
  },

  async chatHistory(gpt_id, gpt_name) {
    gpt_id = "6787c2f96368ac3ad473ad4e";
    gpt_name = "Nia";
    return await axiosInstance.get(
      `chat_history/${gpt_id}/${gpt_name}`,
      jsonHeader()
    );
  },

  async clearChathistory(gpt_id, gpt_name) {
    gpt_id = "6787c2f96368ac3ad473ad4e";
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
